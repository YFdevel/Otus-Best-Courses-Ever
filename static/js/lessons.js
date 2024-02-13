const mainTitle = document.getElementById('main-title');
const mainDesc = document.getElementById('main-desc');
const mainId = document.getElementById('main-id');
const commentsContainerMain = document.getElementById('comments-container-main');
const showCommentsBtn = document.getElementById('show-comments-btn');

mainTitle.innerText = document.getElementsByClassName('slider-article-title')[0].innerText;
mainDesc.innerText = document.getElementsByClassName('slider-article-desc')[0].innerText;
mainId.innerText = document.getElementsByClassName('slider-article-id')[0].innerText;
commentsContainerMain.innerHTML = document.getElementsByClassName('comments-container')[0].innerHTML;

async function makeLessonMain(element) {
    mainTitle.innerText = element.getElementsByClassName('slider-article-title')[0].innerText;
    mainDesc.innerText = element.getElementsByClassName('slider-article-desc')[0].innerText;
    mainId.innerText = element.getElementsByClassName('slider-article-id')[0].innerText;
    await getComments(mainId.innerText);
    console.log(mainId.innerText)
    commentsContainerMain.innerHTML = element.getElementsByClassName('comments-container')[0].innerHTML;
}

function hideComments(element) {
    const commentsBlock = element.nextElementSibling;
    commentsBlock.classList.toggle("hidden");
    if (commentsBlock.classList.contains("hidden")) {
        element.getElementsByTagName("span")[0].innerText = "Посмотреть комментарии";
        element.getElementsByTagName("img")[0].src = "/images/downarrow.png";
    } else {
        element.getElementsByTagName("span")[0].innerText = "Скрыть комментарии";
        element.getElementsByTagName("img")[0].src = "/images/arrow_up.png";
    }

}

const getComments = async(id) => {
    try {
        const res = await axios(
            {
                method: "get",
                url: `/comments/lesson/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
        console.log(res.data)
    }catch (err) {
        if (err.response) {
            console.log(err.response.status);
            console.log(err.response.statusText);
            console.log(err.message);
            console.log(err.response.headers); // 👉️ {... response headers here}
            console.log(err.response.data); // 👉️ {... response data here}
        } else if (error.request) {
            // 👇️ Request was made, but no response was received
            console.log(error.request);
        } else {
            console.log(error.message);
        }
    }
};


