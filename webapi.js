function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function api_getICalURL() {
  return getICalURL();
}

function api_setICalURL(formObject) {
  let result = {
    error: false,
    message: "Succeeded to set URL of your calendar."
  };
  try {
    let url = formObject.iCalUrl;
    if (!url || !url.trim()) {
      throw "URL is empty.";
    }
    let content;
    try {
      content = UrlFetchApp.fetch(url).getContentText();
    } catch (e) {
      throw "Failed to get content of the URL. " + e.toString();
    }
    if (!content || !content.trim()) {
      throw "Content is empty.";
    }
    setICalURL(url);
  } catch (e) {
    result.error = true;
    result.message = e.toString();
  }
  return result;
}