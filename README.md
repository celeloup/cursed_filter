# 🤡 The very cursed filter
A very dumb but fun project.

## Inspiration
Ever saw a tweet that made such an impression on you, you dreamed about it ? Me neither but [that tweet](https://twitter.com/jonty/status/1352727559235117058) almost got me there.    
<p align="center"><img alt="Jonty superbe tweet" src="/assets/tweet_jonty.png"/></p>
For some reason I really wanted to see it live so I made my own version, in Javascript.

## Stack
I used [p5.js](https://p5js.org/) to draw on the canvas and [ml5js](https://ml5js.org/) as an API to [face-api.js](https://github.com/justadudewhohacks/face-api.js/blob/master/README.md) to access face landmark detection.   

## Usage
I usually use a simple python server to run my p5.js sketches.   
```
python3 -m http.server
```

#### Display this filter on OBS
The simplest way I found to use this beautiful filter on my streams is to run the app and add the webpage as a new source and then add a chroma key incrustation (you can change the `background_color` to green).

## To do
- [ ] Add libraries to the repo
- [ ] Better error handling
- [ ] Smoother animation (buff the previous landmarks position to avoid shaking effect)
- [ ] Delay between the two eyes images for a creepier effect
- [ ] Initialization animation
- [ ] Window animation
- [ ] Connect to Twitch API to trigger animation on channel points reward claim

## Call for contribution
If you too fell in love with the idea of looking terrifying and would like to turn this prototype into a real filter for OBS, feel free to contribute or contact me directly on 🐦[twitter](https://twitter.com/celia_leloup).   
Pull requests are welcome and don't hesitate to open an issue to discuss any improvements.
