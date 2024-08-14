export default function querystring(name: string, redirectLink: boolean, url = window.location.href) {
    // name is the argument after "?" and before "=" exmaple ?redirect=/profile
    name = name.replace(/[[]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);
  
    if (!results) {
      return null;
    }
    if(redirectLink) {
      if (!results[0]) {
        return "";
      }
    
      return decodeURIComponent(results[0].replace(/\+/g, " "));

    } else {
      if (!results[2]) {
        return "";
      }
    
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  }