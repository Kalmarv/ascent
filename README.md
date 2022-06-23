<h1 align="center" id="title">Ascent</h1>

<p align="center"><img src="https://i.imgur.com/gJY1VJu.jpg" alt="project-image"></p>

<h2 id="description" align="center">Dynamic 3D display for your currently playing song on Last.fm</h2>

Ascent is a site I made to display your currently playing song from Last.fm in a rendered 3d scene with custom shaders. I learned a lot through building this project about authentication, fetching data, managing state, and tying together a backend/frontend.

## Getting Started

You will need Node.js and git to run this project locally

### Installing

```bash
git clone https://github.com/Kalmarv/ascent/
cd ascent
npm install
```

### Environment Variables

You will need a Last.fm api key, you can get one [here](https://www.last.fm/api/account/create)
create a .env.local file and add the key you created
```
LASTFM_KEY=YOUR_KEY
```
After that you can spin up the dev server
```bash
npm run dev
```

## Process

## Start

I originally built a [version](https://github.com/Kalmarv/Synify) of this site using the Spotify web api, which had users connect to the app through Spotify, but in the end Spotify denied my quota extension due to their restrictions on how album art is displayed. That’s a real shame, because I’m sure there’s way more people that would use the site if it was just Spotify, instead of [Last.fm](http://last.fm), as many more people have a Spotify account than a Last.fm account set up.

The advantage of using [last.fm](http://last.fm) is there are more sources that it can connect to, for example I have a home server running [Navidrome](https://www.navidrome.org/) which is connected to my last.fm account and can display albums from there.

## Architecture

![Untitled-2022-05-30-1822.png](https://i.imgur.com/BvZrTip.png)

The user enters their username on the site, which will send them to the page with the react-three-fiber renderer, and also send a post request to the backend with their [last.fm](http://last.fm) username.

When the backend receives the post request, it will send a get request to the Last.fm web api with their username to get their currently (or last played) song. I used a backend for this because the Last.fm api needs a secret for the request. I loaded this as an environment variable so that it is never exposed to the end user, or the code on GitHub.

Once the backend gets the response from Last.fm it sends it back to the client, with the relevant information. This info is then used as props in the react-three-fiber scene.

## Challenges

### Next.js hybrid SSR/CSR

I didn’t have a great understanding of the architecture of Next.js apps, and their various rendering options, which caused issues with the canvas being not defined on reload, but it worked fine on initial loading. I learned about dynamic imports and was able to use that to render the scene without Next trying to SSR it.

### State Management

I wanted users to be able to customize various settings to control how the scene looked from the Tweakpane panel, and also persist those settings to local storage so the scene would look the same on reload. I had a lot of issues keeping the settings, GUI controls, and actual settings being applied to the scene in sync. This was exacerbated by the fact that multiple components had to be updated from Tweakpane. I eventually settled on having the controls not update the scene directly, but instead a Zustand store. The components then get their settings from the store. On loading the page, Zustand first checks for settings saved to local storage and sets those settings as the default.

## Built With
- Next.js
- React
- React Three Fiber
- Tailwind CSS
- Typescript
- Zustand
- Tweakpane

## License

This project is licensed under the MIT License
