---
title: The downfall of the frontend giant
published: true
description: The illness of React ecosystem.
date: 2022-03-16
tags: react, javascript
---

For a long time, I was a React fanboy. I didn't have a problem working in another frontend framework, vanilla javascript, generating HTML from the server, but I just liked React more. How React works matched how I think, and I just fell in love. The love lasted for a few years, but something happened. React changed, problems arrived, and I started questioning that love.

So, what happened and what are the problems? Let me try to explain.

## Beginning

In 2017, I had to build an e-commerce website, and a wise man consulted me to use a new shiny thing called React. I've used Vue and Angular.js before that, but I have never tried React. Since that wise man was a project architect, I could only agree with his choices. He also said, "combine it with Redux and Redux-form libraries" and I did that. I've entered egghead, "learned" that stack, and started the work. Long story short, after about six months, I've had to rewrite the whole project because I've created an unmaintainable monster. That situation motivated me to learn how it works, how to build apps with it and enter a relationship with a JS library.


## Problem 1 (Innovations)

Even tho I've managed to learn React well and enjoyed the privilege to be recognized as a "React guy" I had a strange feeling about React. That feeling was the immaturity of the ecosystem and library itself. The story of the "whole system rewriting" from the beginning came back to me a few times on other projects. It's not a case that we wrote "bad" code (or approached a total rewrite for real), but the architectural styles and set of libraries became obsolete as the new ones arrived before current ones had a chance to see production.

This problem got solved to a certain extent by some of the popular React frameworks like Next.js, which tries to keep a continuous development experience and APIs through different React versions. Still, there are many places where the framework isn't the one setting the rules. Maybe some new frameworks (like Remix) will solve that. We will see.

## Problem 2 (Architecture)

Have you ever started to React app from scratch? Feel free to skip this section if you ever did that since you've probably already experienced the torture. To others, this YouTube video title may help you understand "Picking From 20 React State Managers" - you get an idea? So it's not only the state management that's questioned here. Folder structure, testing strategies/libraries, hook libraries, data fetching libraries, component architecture, styling tools, and many other things involved in the architecture decision process. Saying "I'm React developer" today doesn't tell much since the completed stack consists of many other tools and libraries that vary from project and company.

## Problem 3 (Engineering)

Besides the upgrade/architectural struggle, React is performant and maintainable when used in the right way. However, it's really easy for developers to make a mess and make projects hard to maintain. In [one of Fireship's videos](https://www.youtube.com/watch?v=b0IZo2Aho9Y), plenty of antipatterns are explained, but those are only general ones related to React's core functionality. As the dependency list enlarges, the same does the easiness to make a mess. The problem and responsibility aren't just on developers, but also on the React itself, which by design allows such implementations. On the enterprise-grade application, misuse of some libraries can evolve into a time bomb.

## Future

In the end, React isn't bad by default, but the freedom it brings (to do whatever you want) introduces a bunch of problems that we accidentally or intentionally misuse every day. We can switch to some of the other libraries or frameworks that have some of the problems React faces solved. The best thing should be to improve our general React knowledge and investigate more ways to make it more maintain-friendly as the project enlarge.

If you made it to this point, go and improve your knowledge. And advocate that to other wannabe JavaScript/React developers so we collectively suffer less.
