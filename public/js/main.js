document.addEventListener('DOMContentLoaded', function () {
    const boardList = document.getElementById('board-list');
    const writeForm = document.getElementById('write-form');
  
    if (boardList) {
      loadBoards();
    }
  
    if (writeForm) {
      writeForm.addEventListener('submit', submitWriteForm);
    }
  });
  
  async function loadBoards() {
    const response = await fetch('/api/boards');
    const boards = await response.json();
    const items = boards.map(createBoardListItem).join('');
    document.getElementById('board-list').innerHTML = items;
  }
  
  function createBoardListItem(board) {
    return `
      <li data-id="${board._id}">
        <h3>${board.title}</h3>
        <p>${board.content}</p>
      </li>
    `;
  }
  
  async function submitWriteForm(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    const response = await fetch('/api/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
  
    const result = await response.json();
  
    if (result.success) {
      alert('글이 정상적으로 등록되었습니다.');
      window.location.href = '/';
    } else {
      alert('글 등록에 실패하였습니다.');
    }
  }
  