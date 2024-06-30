const clearGraph = (graphId) => {
  d3.select(`#${graphId}`).selectAll('*').remove();
};

const drawGitGraph = (gitInfo, graphId) => {
  const parsedData = parseGitInfo(gitInfo);
  clearGraph(graphId);

  const { nodes, links, nodeRadius, nodeSpacing, x1, x2, untrackedChanges, notStagedChanges, stagedChanges } = parsedData;
  const svgWidth = x2 * 2;
  const svgHeight = (nodes.length + 3) * nodeSpacing;
  const offsetX = (svgWidth - (x2 + x1)) / 2;

  const svg = d3.select(`#${graphId}`).append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  svg.append('defs').append('marker')
    .attr('id', 'arrow')
    .attr('markerWidth', 10)
    .attr('markerHeight', 6)
    .attr('refX', 5)
    .attr('refY', 3)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,0 L0,6 L6,3 z')
    .attr('fill', '#000');

  const linkSelection = svg.selectAll('.link')
    .data(links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('x1', d => d.sourceX + offsetX)
    .attr('y1', d => d.sourceY)
    .attr('x2', d => d.targetX + offsetX)
    .attr('y2', d => d.targetY)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('marker-end', 'url(#arrow)');

  const nodeGroups = svg.selectAll('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x + offsetX}, ${d.y})`);

  nodeGroups.append('circle')
    .attr('r', nodeRadius)
    .attr('fill', d => d.isMainLine ? '#66B3FF' : '#FF9797')
    .attr('stroke', d => d.isMainLine ? '#ECF5FF' : '#FFECEC')
    .attr('stroke-width', 6)
    .on('mouseover', function (event, d) {
      const tooltip = d3.select(`#${graphId}`)
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('padding', '5px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')
        .html(`<strong>${d.id}</strong><br/>${d.message}`);
      tooltip.style('left', `${event.pageX + 5}px`)
        .style('top', `${event.pageY - 28}px`);
    })
    .on('mouseout', function () {
      d3.select(`#${graphId}`).select('.tooltip').remove();
    });

  nodeGroups.append('text')
    .attr('x', 0)
    .attr('y', 5)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text((d, i) => `C${nodes.length - 1 - i}`);

  const additionalNodes = [];
  const lastCommit = nodes[0];

  if (untrackedChanges.length > 0 || notStagedChanges.length > 0) {
    additionalNodes.push({
      x: x1 - 2 * nodeRadius,
      y: lastCommit.y + nodeSpacing,
      type: 'untracked',
      data: [...untrackedChanges, ...notStagedChanges],
      title: 'Untracked and Not Staged Files'
    });
  }

  if (stagedChanges.length > 0) {
    additionalNodes.push({
      x: x1 + 2 * nodeRadius,
      y: lastCommit.y + nodeSpacing,
      type: 'staged',
      data: stagedChanges,
      title: 'Changes To Be Committed'
    });
  }

  additionalNodes.forEach((node) => {
    const group = svg.append('g')
      .attr('transform', `translate(${node.x + offsetX},${node.y})`);

    group.append('circle')
      .attr('r', nodeRadius)
      .attr('fill', 'none')
      .attr('stroke', '#ECF5FF')
      .attr('stroke-dasharray', node.type === 'untracked' ? '5,5' : 'none')
      .attr('stroke-width', 6);

    group.on('mouseover', function (event) {
      const tooltip = d3.select(`#${graphId}`)
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('padding', '5px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')
        .html(`<strong>${node.title}</strong><br/>${node.data.join('<br/>')}`);
      tooltip.style('left', `${event.pageX + 5}px`)
        .style('top', `${event.pageY - 28}px`);
    }).on('mouseout', function () {
      d3.select(`#${graphId}`).select('.tooltip').remove();
    });
  });

  const graphContainer = document.querySelector(`#${graphId}`);
  graphContainer.scrollTop = graphContainer.scrollHeight;

  // 繪製完畢後，將 SVG 內容轉換為字串並儲存
  setTimeout(() => {
    const svgElement = d3.select(`#${graphId} svg`);
    if (svgElement.node()) {
      const svgHtml = svgElement.node().outerHTML;
      localStorage.setItem(`graphContent_${graphId}`, svgHtml);
    }
  }, 0);
};

const parseGitInfo = (gitInfo) => {
  const branch = gitInfo.branches[gitInfo.current];
  if (!branch) return { nodes: [], links: [], untrackedChanges: [], notStagedChanges: [], stagedChanges: [] };

  const nodeRadius = 20;
  const nodeSpacing = 70;
  const x1 = nodeRadius * 2;
  const x2 = nodeRadius * 6;

  const nodes = [];
  const links = [];
  const untrackedChanges = branch.UntrackedFiles;
  const notStagedChanges = branch.ChangesNotStaged;
  const stagedChanges = branch.ChangesToBeCommitted;

  const commitMap = {};
  branch.commits.forEach((commit, index) => {
    const isMainLine = commit.source.length <= 1;
    const x = isMainLine ? x1 : x2;
    const y = (branch.commits.length - 1 - index) * nodeSpacing + nodeRadius;

    nodes.push({
      id: commit.hash,
      message: commit.message,
      x,
      y,
      isMainLine,
    });

    commitMap[commit.hash] = { x, y, isMainLine };
  });

  branch.commits.forEach((commit) => {
    commit.source.forEach((sourceHash) => {
      const sourceNode = commitMap[sourceHash];
      if (sourceNode) {
        links.push({
          sourceX: sourceNode.x,
          sourceY: sourceNode.y + nodeRadius,
          targetX: commitMap[commit.hash].x,
          targetY: commitMap[commit.hash].y - nodeRadius
        });
      }
    });
  });

  return { nodes, links, untrackedChanges, notStagedChanges, stagedChanges, nodeRadius, nodeSpacing, x1, x2 };
};

const loadGraphFromLocalStorage = (graphId) => {
  const storedSvgHtml = localStorage.getItem(`graphContent_${graphId}`);
  if (storedSvgHtml) {
    const container = document.getElementById(graphId);
    container.innerHTML = storedSvgHtml;
  }
};
