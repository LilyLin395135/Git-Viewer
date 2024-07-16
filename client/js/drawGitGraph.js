const clearGraph = (graphId) => {
  d3.select(`#${graphId}`).select('svg').remove();
};

const loadGraphFromLocalStorage = (graphId) => {
  const storedSvgHtml = localStorage.getItem(`graphContent_${graphId}`);
  if (storedSvgHtml) {
    const container = document.getElementById(graphId);
    container.innerHTML += storedSvgHtml;
  }
};

const drawGitGraph = (gitInfo, graphId, folderPath) => {
  clearGraph(graphId);
  const { logOutput, UntrackedFiles, ChangesNotStaged, ChangesToBeCommitted } = gitInfo;
  const nodeRadius = 20;
  const nodeSpacing = 70;
  const xSpacing = nodeRadius * 4;

  const nodes = [];
  const links = [];
  const commitMap = {};
  const branchMap = new Map();
  const lastNode = new Map();

  // 处理 logOutput 和 commitMessages
  logOutput.forEach((logLine, index) => {
    // 每列数来第一个是 hash, parent1, parent2
    const parts = logLine.match(/(?:[^\s()]+|\(.*?\))/g); // 确保括号内的内容是一个完整的部分
    const hash = parts[0];
    const parent1 = parts[1];
    let parent2 = null;
    let branchInfo = '';

    if (parts.length > 2) {
      if (parts[2].startsWith('(')) {
        branchInfo = parts[2];
      } else {
        parent2 = parts[2];
      }
    }

    if (parts.length > 3) branchInfo = parts[3];

    let x;

    // 判断每列的 hash
    if (index === 0 || !branchMap.has(hash)) {
      // 当 hash 是第 0 列第 0 个或没有在任何分支集合中，就分配到主线上
      x = 0;
      branchMap.set(hash, 0);
    } else {
      // 维持在 branchMap 中的位置
      x = branchMap.get(hash);
    }

    const labelIndex = logOutput.length - index - 1;

    nodes.push({
      id: hash,
      x: x * xSpacing,
      y: (logOutput.length - index - 1) * nodeSpacing + nodeSpacing,
      isMainLine: x === 0,
      label: `C${labelIndex}`,
      branchInfo: branchInfo.trim()
    });

    commitMap[hash] = {
      x: x * xSpacing,
      y: (logOutput.length - index - 1) * nodeSpacing + nodeSpacing,
      isMainLine: x === 0,
      parents: [parent1, parent2]
    };

    lastNode.set(x, { x: commitMap[hash].x, y: commitMap[hash].y, id: hash }); // 更新 lastNode

    if (parent1) {
      let parent1x;
      if (!branchMap.has(parent1)) {
        parent1x = x;
        branchMap.set(parent1, x);
      } else {
        parent1x = branchMap.get(parent1);
      }
    }

    if (parent2) {
      let parent2x = branchMap.has(parent2) ? branchMap.get(parent2) : (x + 1);
      branchMap.set(parent2, parent2x);
    }
  });

  const [minX, maxX] = d3.extent(nodes, d => d.x);
  const svgWidth = (maxX + xSpacing) * 2; // 为了确保图形宽度足够，需要增加额外的间距
  const svgHeight = (logOutput.length + 4) * nodeSpacing;
  const offsetX = (svgWidth - xSpacing) / 2;

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

  // 处理 UntrackedFiles, ChangesNotStaged 和 ChangesToBeCommitted
  const additionalNodes = [];
  if (UntrackedFiles.length > 0 || ChangesNotStaged.length > 0) {
    additionalNodes.push({
      x: 0 - 2 * nodeRadius,
      y: (logOutput.length) * nodeSpacing + nodeSpacing,
      type: 'untracked',
      data: [...UntrackedFiles, ...ChangesNotStaged],
      title: 'Untracked and Not Staged Files'
    });
  }

  if (ChangesToBeCommitted.length > 0) {
    additionalNodes.push({
      x: 0 + 2 * nodeRadius,
      y: (logOutput.length) * nodeSpacing + nodeSpacing,
      type: 'staged',
      data: ChangesToBeCommitted,
      title: 'Changes To Be Committed'
    });
  }

  additionalNodes.forEach((node) => {
    const group = svg.append('g')
      .attr('transform', `translate(${node.x + offsetX},${node.y})`);

    group.append('circle')
      .attr('r', nodeRadius)
      .attr('fill', 'none')
      .attr('stroke', '#0066CC')
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

  nodes.forEach((node, index) => {
    const parent1 = commitMap[node.id].parents[0];
    const parent2 = commitMap[node.id].parents[1];

    if (parent1) {
      drawLink(svg, {
        sourceX: node.x,
        sourceY: node.y - nodeRadius,
        targetX: commitMap[parent1].x,
        targetY: commitMap[parent1].y + nodeRadius,
      }, offsetX);
    }

    if (parent2) {
      drawLink(svg, {
        sourceX: node.x,
        sourceY: node.y - nodeRadius,
        targetX: commitMap[parent2].x,
        targetY: commitMap[parent2].y + nodeRadius,
      }, offsetX);
    }
  });

  nodes.forEach((node) => {
    drawNode(svg, node, nodeRadius, offsetX, folderPath);
  });

  const graphContainer = document.querySelector(`#${graphId}`);
  graphContainer.scrollTop = graphContainer.scrollHeight;

  // 绘制完毕后，将 SVG 内容转换为字符串并存储
  setTimeout(() => {
    const svgElement = d3.select(`#${graphId} svg`);
    if (svgElement.node()) {
      const svgHtml = svgElement.node().outerHTML;
      localStorage.setItem(`graphContent_${graphId}`, svgHtml);
    }
  }, 0);

  return {
    nodes,
    links,
    untrackedChanges: UntrackedFiles,
    notStagedChanges: ChangesNotStaged,
    stagedChanges: ChangesToBeCommitted,
    nodeRadius,
    nodeSpacing,
    x1: 0,
    x2: xSpacing
  };
};

const drawNode = (svg, node, radius, offsetX, folderPath) => {
  const nodeGroup = svg.append('g')
    .attr('class', 'node')
    .attr('transform', `translate(${node.x + offsetX}, ${node.y})`);

  nodeGroup.append('circle')
    .attr('r', radius)
    .attr('fill', node.isMainLine ? '#66B3FF' : '#FF9797')
    .attr('stroke', node.isMainLine ? '#0066CC' : '#FF2D2D')
    .attr('stroke-width', 6)
    .attr('pointer-events', 'all')
    .on('mouseover', async function (event, d) {
      const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('padding', '5px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')

      // 動態獲取 commit message
      try {
        const commitMessage = await window.electron.fetchCommitMessage(node.id, folderPath);
        tooltip.html(`<strong>${node.id}</strong><br/>${commitMessage}`);
      } catch (error) {
        tooltip.html(`<strong>${node.id}</strong><br/>Error fetching commit message`);
      }

      tooltip.style('left', `${event.pageX + 5}px`)
        .style('top', `${event.pageY - 28}px`);
    })
    .on('mouseout', function () {
      d3.select('.tooltip').remove();
    });

  nodeGroup.append('text')
    .attr('x', 0)
    .attr('y', 5)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text(node.label);
};

const drawLink = (svg, link, offsetX) => {
  svg.append('line')
    .attr('class', 'link')
    .attr('x1', link.targetX + offsetX)
    .attr('y1', link.targetY)
    .attr('x2', link.sourceX + offsetX)
    .attr('y2', link.sourceY)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('marker-end', 'url(#arrow)');
};
