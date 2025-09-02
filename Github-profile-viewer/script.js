document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("inputField")
    const searchBtn = document.getElementById("searchButton")
    const Fullname = document.getElementById("name")
    const userName = document.getElementById("username")
    const Followers = document.getElementById("Followers")
    const Following = document.getElementById("Following")
    const about = document.getElementById("bio")
    const Location = document.getElementById("Location")
    const company = document.getElementById("Company")
    const Joined = document.getElementById("Joined")
    const avatar = document.getElementById("avatar")
    const skeleton = document.getElementById("skeleton")
    const repoSection = document.getElementById("repoSection")

    function setupEventListeners() {
        inputField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                performSearch();
            }
        });

        searchBtn.addEventListener("click", performSearch);
    }

    async function performSearch() {
        const username = inputField.value.trim()
        if (!username) return alert("Enter a username");
        try {
            const profileData = await getData(username)
            profile(profileData)
        } catch (error) {
            alert("Error Occurred: " + error.message);
        }
    }

    async function getData(username) {
        const url = `https://api.github.com/users/${username}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("User Not Found");
        }
        return await response.json()
    }

    async function profile(apidata) {
        skeleton.style.display = "none"
        repoSection.style.display = "block"
        avatar.src = apidata.avatar_url
        Fullname.innerHTML = apidata.name;
        userName.innerHTML = apidata.login;
        Followers.innerHTML = apidata.followers;
        Following.innerHTML = apidata.following;
        about.innerHTML = apidata.bio;
        Location.innerHTML = apidata.location
        if (apidata.company === null) {
            company.innerHTML = "Not Mentioned"
        } else {
            company.innerHTML = apidata.company
        }
        const year = new Date(apidata.created_at).getFullYear();
        Joined.innerHTML = year

        const JSONrepoData = await repoapi(apidata.repos_url)
        const repo1Link = document.getElementById("repo1Link")
        const repo1Stars = document.getElementById("repo1Stars")
        const repo1Forks = document.getElementById("repo1Forks")
        const repo1Lang = document.getElementById("repo1Lang")

        const lastRepo = JSONrepoData.at(-1);
        repo1Link.href = lastRepo.svn_url
        repo1Link.innerHTML = `📂 <b>${lastRepo.name}</b>`
        if (lastRepo.language === null) {
            repo1Lang.innerHTML = `💻 No Data Found`
        } else {
            repo1Lang.innerHTML = `💻 ${lastRepo.language}`
        }
        repo1Forks.innerHTML = `🍴 ${lastRepo.forks}`
        repo1Stars.innerHTML = `⭐ ${lastRepo.stargazers_count}`

        const repo2Link = document.getElementById("repo2Link")
        const repo2Stars = document.getElementById("repo2Stars")
        const repo2Forks = document.getElementById("repo2Forks")
        const repo2Lang = document.getElementById("repo2Lang")

        const lastSecondRepo = JSONrepoData.at(-2);
        repo2Link.href = lastSecondRepo.svn_url
        repo2Link.innerHTML = `📂 <b>${lastSecondRepo.name}</b>`

        if (lastSecondRepo.language === null) {
            repo2Lang.innerHTML = `💻 No Data Found`
        } else {
            repo2Lang.innerHTML = `💻 ${lastSecondRepo.language}`
        }

        repo2Forks.innerHTML = `🍴 ${lastSecondRepo.forks}`
        repo2Stars.innerHTML = `⭐ ${lastSecondRepo.stargazers_count}`

        const repo3Link = document.getElementById("repo3Link")
        const repo3Stars = document.getElementById("repo3Stars")
        const repo3Forks = document.getElementById("repo3Forks")
        const repo3Lang = document.getElementById("repo3Lang")

        const lastThirdRepo = JSONrepoData.at(-3);
        repo3Link.href = lastThirdRepo.svn_url
        repo3Link.innerHTML = `📂 <b>${lastThirdRepo.name}</b>`
        if (lastThirdRepo.language === null) {
            repo3Lang.innerHTML = `💻 No Data Found`
        } else {
            repo3Lang.innerHTML = `💻 ${lastThirdRepo.language}`
        }
        repo3Forks.innerHTML = `🍴 ${lastThirdRepo.forks}`
        repo3Stars.innerHTML = `⭐ ${lastThirdRepo.stargazers_count}`

        async function repoapi(data) {
            const repoUrl = data
            const repoApiData = await fetch(repoUrl)
            const repoResponse = await repoApiData.json()
            return repoResponse
        }
    }

    setupEventListeners();
})