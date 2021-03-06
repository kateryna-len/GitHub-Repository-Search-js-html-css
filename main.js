let btn = document.getElementById('btn')
console.log(btn)

btn.addEventListener('click', showGitHubrepository)

function showGitHubrepository() {
  let search = document.getElementById('research').value
  let page = 100;
  let url = 'https://api.github.com/search/repositories?q=' + search + '&per_page=' + page

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        console.log('Repository Not Found')
        document.getElementById("res").innerHTML = `
        Repository Not Found
        `
      } else {
        console.log(data.items)
        const showInHTML = data.items.map((item) => {
          return `
          <div class='item-box'>
           <p><span class='text-stron'>${item.full_name}</span>  <span class='text-grey text-visab'> ${item.visibility} archive</span> </p>
          <p> ${item.description}</p>
         <p><span>Link:</span> <a href='${item.html_url}' target='_blank'>${item.clone_url}</a></p>
         <div class='text-grey'><span class='text-start'>⭐ ${item.watchers_count}</span></div>
          </div>
          `
        }).join('')
        document.getElementById('res').innerHTML = showInHTML
      }
    }).catch(e => {
      console.log(e)
    })
}

// await octokit.request('GET /search/repositories?q=js&page=1', {})