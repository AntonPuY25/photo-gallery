const main = document.querySelector('.mainBody')
const input = document.querySelector('input')
const submit = document.querySelector('.submit')
const loading = document.querySelector('.loading')



const dataHandler = ()=>{
    main.innerHTML = ''
    loading.style.display='flex'
    getData(input?.value || 'summer')

}

 submit.addEventListener('click',dataHandler)
input.addEventListener('keydown',(e)=> {
    if (e.keyCode === 13) {
        dataHandler()
    }
})


async function getData(param='summer') {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=10&api_key=1e4d008b9e277248c98d6bec026aaf74&tags=${param}&tag_mode=all&extras=url_m&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    loading.style.display='none'
    sendData(data)


}
getData();

const sendData = (data)=>{
    if(data.photos.photo.length){
        data.photos.photo.forEach(item=>{
            const container = document.createElement('div')
            container.classList.add('content')
            container.innerHTML = `<img  src=${item.url_m} alt="photo" >`
            main.appendChild(container)
        })
    }else{
        const container = document.createElement('div')
        container.classList.add('error')
        container.textContent = 'Данные не найдены!'
        main.appendChild(container)
    }


}
