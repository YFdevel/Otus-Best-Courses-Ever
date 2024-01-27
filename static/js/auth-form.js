const formElemUp = document.querySelector(".auth-form-up");
const formElemIn = document.querySelector(".auth-form-in");

formElemUp.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formElemUp);
    axios(
        {
            method: "post",
            url: '/users',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            data:
                Object.fromEntries(formData.entries())
        })
        .catch(function (error) {
            console.log(error.message);
        });
};

formElemIn.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formElemIn);
    axios(
        {
            method: "post",
            url: '/users/#',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            data:
                Object.fromEntries(formData.entries())
        })
        .catch(function (error) {
            console.log(error.message);
        });
};
