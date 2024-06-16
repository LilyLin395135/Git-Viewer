const checkIsGitManage = (folderPath) => {
  const fs = window.require('fs');
  const path = window.require('path');

  while (folderPath) {
    if (fs.existsSync(path.join(folderPath, '.git'))) {
      return folderPath;
    }
    const parentFolder = path.dirname(folderPath);
    if (parentFolder === folderPath) break;
    folderPath = parentFolder;
  }
  return null;
};

const getFolderStatus = async () => {
  const folderPath = '';
  const gitExists = folderPath ? checkIsGitManage(folderPath) : false;
  return { folderPath, gitExists };
};

const updateButtonStatus = (button, folderPath, gitExists) => {
  if (!folderPath || gitExists) {
    button.setAttribute('disabled', true);
  } else {
    button.removeAttribute('disabled');
  }
};

const initButtonState = async () => {
  const gitInitButton = document.getElementById('git-init');
  const { folderPath, gitExists } = await getFolderStatus();

  updateButtonStatus(gitInitButton, folderPath, gitExists);
};

document.addEventListener('DOMContentLoaded', initButtonState);

document.getElementById('open-folder').addEventListener('click', async () => {
  try {
    const result = await window.electron.openFolder();
    if (result) {
      const gitInfo = await window.electron.getGitInfo(result.folderPath);
      console.log(gitInfo);
      drawGitGraph(gitInfo);
      console.log('Selected folder:', result.folderPath);
      const gitInitButton = document.getElementById('git-init');
      updateButtonStatus(gitInitButton, result.folderPath, result.gitExists);

      if (!result.gitExists) {
        gitInitButton.onclick = async () => {
          try {
            const response = await window.electron.initGit(result.folderPath);
            if (response && response.status === 'cancelled') {
              console.log('Git init operation cancelled.');
              return;
            }
            console.log(response);
            gitInitButton.setAttribute('disabled', true);
          } catch (error) {
            console.error('Error Initializing git:', error);
          }
        };
      }
    }
  } catch (error) {
    console.error('Error opening folder:', error);
  }
});

const drawGitGraph = (gitInfo) => {
  const parsedData = parseGitInfo(gitInfo);
  // 清空之前的圖形
  d3.select('#formal-graph').selectAll('*').remove();

  const nodeRadius = parsedData.nodeRadius;
  const nodeSpacing = parsedData.nodeSpacing;
  const x1 = parsedData.x1;
  const x2 = parsedData.x2;
  const strokeWidth = 6;
  const svgWidth = x2 * 2;
  const svgHeight = (parsedData.nodes.length + 3) * nodeSpacing;

  //計算中心偏移量
  const offsetX = (svgWidth - (x2 + x1)) / 2;

  const svg = d3.select('#formal-graph').append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const arrowMarker = svg.append('defs').append('marker')
    .attr('id', 'arrow')
    .attr('markerWidth', 10)
    .attr('markerHeight', 6)
    .attr('refX', 5)
    .attr('refY', 3)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,0 L0,6 L6,3 z')
    .attr('fill', '#000');

  parsedData.links.forEach(link => {
    svg.append('line')
      .attr('x1', link.sourceX + offsetX)
      .attr('y1', link.sourceY)
      .attr('x2', link.targetX + offsetX)
      .attr('y2', link.targetY)
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');
  });

  const nodes = svg.selectAll('g')
    .data(parsedData.nodes)
    .enter().append('g')
    .attr('transform', (d) => `translate(${d.x + offsetX}, ${d.y})`);

  nodes.append('circle')
    .attr('r', nodeRadius)
    .attr('fill', d => d.isMainLine ? '#66B3FF' : '#FF9797')
    .attr('stroke', d => d.isMainLine ? '#ECF5FF' : '#FFECEC')
    .attr('stroke-width', strokeWidth)
    .on('mouseover', function (event, d) {
      const tooltip = d3.select('#formal-graph')
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
      d3.select('#formal-graph').select('.tooltip').remove();
    });

  nodes.append('text')
    .attr('x', 0)
    .attr('y', 5)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text((d, i) => `C${parsedData.nodes.length - 1 - i}`);

  // 畫出未Add檔案
  const additionalNodes = [];
  const lastCommit = parsedData.nodes[0];

  //如果有未Add
  //additionalNodes要放入x、y、type、data、title
  if (parsedData.untrackedChanges.length > 0 || parsedData.notStagedChanges.length > 0) {
    additionalNodes.push({
      x: x1 - 2 * nodeRadius,
      y: lastCommit.y + nodeSpacing,
      type: 'untracked',
      data: [...parsedData.untrackedChanges, ...parsedData.notStagedChanges],
      title: 'Untracked and Not Staged Files'
    });
  }

  if (parsedData.stagedChanges.length > 0) {
    additionalNodes.push({
      x: x1 + 2 * nodeRadius,
      y: lastCommit.y + nodeSpacing,
      type: 'staged',
      data: parsedData.stagedChanges,
      title: 'Changes To Be Committed'
    });
  }

  //對每個node做事
  additionalNodes.forEach((node) => {
    //在現有的 SVG 容器中添加了 <g> SVG 群組元素
    const group = svg.append('g')
      .attr('transform', `translate(${node.x + offsetX},${node.y})`);

    //每個g元素添加circle元素
    group.append('circle')
      .attr('r', nodeRadius)
      .attr('fill', 'none')
      .attr('stroke', '#ECF5FF')
      .attr('stroke-dasharray', node.type === 'untracked' ? '5,5' : 'none')
      .attr('stroke-width', strokeWidth);

    group.on('mouseover', function (event) {
      const tooltip = d3.select('#formal-graph')
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
      d3.select('#formal-graph').select('.tooltip').remove();
    });
  });

  // Scroll to the bottom to show the latest commit
  const graphContainer = document.querySelector('#formal-graph');
  graphContainer.scrollTop = graphContainer.scrollHeight;
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

  branch.commits.forEach((commit, index) => {
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
