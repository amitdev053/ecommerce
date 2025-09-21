

  // --- Helper functions for cookie handling ---
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  // --- Generate or get unique user ID ---
  function getOrSetUserId() {
    let userId = getCookie('uniqueUserId');
    if (!userId) {
      userId = 'uid-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
      setCookie('uniqueUserId', userId, 365); // store for 1 year
    }
    return userId;
  }

  const userId = getOrSetUserId();
  console.log('Current User ID:', userId);

  // --- Load Universal Analytics ---
(function(i,s,o,g,r,a,m){
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function(){
    (i[r].q = i[r].q || []).push(arguments);
  };
  i[r].l = 1 * new Date();
  
  a = s.createElement(o);
  m = s.getElementsByTagName(o)[0];
  
  a.async = true;
  a.src = g;
  
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');


//   // --- Initialize GA ---
//   ga('create', 'UA-XXXXXX-Y', 'auto'); // Replace with your UA property ID

//   // --- Set the user ID ---
//   ga('set', 'userId', userId);

//   // --- Send a pageview ---
//   ga('send', 'pageview');

export {getOrSetUserId}