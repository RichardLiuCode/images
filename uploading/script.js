/*
⚠️These code are wrote by chatGPT, because they are too complicated,
  
  So I know nothing about the code beload

*/
var earuiobfvoauiegbfvaoiesrf=sigma123456789abcdefg;
let selectedFile;

// 圖片預覽
document.getElementById("fileInput").addEventListener("change", function () {
  selectedFile = this.files[0];
  if (selectedFile) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview").src = e.target.result;
      document.getElementById("preview").style.display = "revert";
    };
    reader.readAsDataURL(selectedFile);
  }
});

async function uploadToGitHub() {
  if (!selectedFile) {
    alert("請先選擇圖片！");
    return;
  }

  var reader = new FileReader();
  reader.onload = async function () {
    var base64Content = reader.result.split(",")[1]; // 只取 base64 內容

    // 🛠️ 修改以下參數為你自己的 GitHub 設定
    var githubUsername = "richardliucode";
    var repoName = "images";
    var folderPath = "uploads"; // 上傳到 uploads 資料夾
    var token = earuiobfvoauiegbfvaoiesrf; // ⚠️ 請替換為你自己的 Token

    var fileName = selectedFile.name;
    var apiUrl = "https://api.github.com/repos/"+githubUsername+"/"+repoName+"/contents/"+folderPath+"/fileName";

    var response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload ${fileName} via API`,
        content: base64Content,
      }),
    });

    var data = await response.json();
    if (response.ok) {
      console.log("上傳成功！");/*成功上傳並顯示*/
      document.getElementById("urlDisplayArea").style.display="revert";
      document.getElementById("urlDisplayTextField").value=data.content.html_url;
    } else {
      alert("Error：" + JSON.stringify(data));
    }
  };
  reader.readAsDataURL(selectedFile);
}



// 禁止右鍵
document.addEventListener("contextmenu", (event) => event.preventDefault());
// 嘗試阻止 F12（部分瀏覽器會有效）
document.addEventListener("keydown", function (event) {
  if (
    event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && event.key == "I") 
    
  ) {
    event.preventDefault();
  }
  
});

//複製網址
document.getElementById("CopyImageURL").addEventListener("click",function(){
  document.getElementById("urlDisplayTextField").select();
  navigator.clipboard.writeText(document.getElementById("urlDisplayTextField").value);
})
