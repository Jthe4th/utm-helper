chrome.runtime.onMessage.addListener((msg) => {
  if (msg.target !== "offscreen") return;
  const buf = document.getElementById("buf");
  buf.value = msg.text;
  buf.select();
  document.execCommand("copy");
});
