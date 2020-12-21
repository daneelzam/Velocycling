const likeId = document.getElementById("addLike");

likeId.addEventListener("click", async (event) => {
  const { action, method } = event.target.parentNode.parentNode.parentNode;

  const promise = await fetch(action, {
    method,
    headers: {
      "Content-type": "application/json",
    },
  });

  const res = await promise.json();

  console.log(res);

  let countLike = document.getElementById("likesCount");

  // let b = a.likes

  countLike.innerText = res.key;
});

