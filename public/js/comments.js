const addCommentForm = document.getElementById('commentForm')
const commentsContainer = document.getElementById('commentsContainer')

addCommentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const {action, method, comment: {value: comment}} = e.target;
  const response = await fetch(action, {
    method,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({comment}),
  });

  const newComment = await response.json();
  commentsContainer.innerHTML += `
    <article id="commentItem">
      <h4 id="commentAuthor">${newComment.authorName}</h4>
      <p id="commentBody">${newComment.text}</p>
    </article>
    <hr>
  `;
  e.target.comment.value = ''
})
