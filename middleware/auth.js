// удваляет cookie если под нее нет сессии
// имя cookie я пока указала - user_sid

function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
}
// проверяет, существует ли сессия и редиректит на личный кабинет
function sessionChecker(req, res, next) {
  if (req.session.user) {
    res.redirect('/authorization/dashboard');
  } else {
    next();
  }
}

function contains(arr, elem) {
  for (var i = 0; i < arr.length; i++) {
      if (arr[i].key === elem) {
          return false;
      }
  }
  return true;
}

module.exports = {
  cookiesCleaner,
  sessionChecker,
  contains,
}