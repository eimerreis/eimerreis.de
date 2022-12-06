---
title: Using tailwind with twin.macro
description: "Over the years, we shifted from CSS/SCSS based styles, over to CSS-in-JS with styled.components, over to tailwindcss. Through this slight migration, we integrated twin.macro into our codebase. Here's what I learned from it."
date: December 5 2022
---

> Disclaimer:  
> I just share my personal experiences with the technologies described, with the knowledge and skill I had at this point in time. I am aware that there might have been alternative solutions for the problems described.

Having plenty of different applications in our company, all of them being created at different points in time with different knowledge and skill set,
we also faced ourselves wanting to try this fancy tailwind thing out once bootstrapping a new application. Since introducing new technologies always involves
breaking your current habits and workflows, I tried to find a way to integrate `tailwind` together with `styled-components` which we used at that time. 

## Why even use tailwind?

I guess there are a lot of other articles about this topic on the internet, so I'll just quickly list the main pros I see in using tailwind

- Simplified usage of complicated CSS properties like `box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)` just being `shadow-sm` in tailwind
- Reducing design inconsistencies through not encouraging the use of `arbitrary-values`. This basically means you should not define exact values 
(like padding: 3px) on an element, and instead use the classnames your design system provides. Especially in a team where you do not have a dedicated designer
I found this very beneficial.
- Having very well-defined defaults. Even though we had some kind of design system in place, we basically just overwrote the colors and defined other font families. Especially in terms of 
spacing tailwind is a real enhancement to our UIs

## Why combine it with styled-components?

At the time I was stumbling upon tailwind I was just about to re-design one of our existing applications, which was developed using `styled-components`. 
Since the product was already shipped to production, an incremental migration was absolutely crucial.
Besides this business implication, there also were some use-cases where `styled-components` came in quite handy:

### Conditional styles

As an alternative to the approach of packages like [classnames](https://www.npmjs.com/package/classnames), we did not have to change our approach of doing conditional styles

```tsx
const StyledButton = styled.button`
    ${({ disabled }) => disabled && tw`pointer-events-none bg-opacity-30`}

    svg {
        ${tw`text-gray-300`}
    }
`
```

### Styling child elements

When styling child elements of something, you can leverage SCSS syntax. This is especially useful when you are just receiving the child elements via the `children` prop
```tsx
// with twin.macro & styled-components
const StyledButton = styled.button`
    svg {
        ${tw`text-gray-300`}
    }
`

// with plain tailwind, you would need to use React.cloneElement(children) and override the classname 
// to achieve the thing above and still would need a bit more complicated logic to only style `svg` children
const Button = (props) => <StyledButton {...props}>{props.children}</StyledButton>

// using the button 
const AddButton = () => <Button><AddIcon />Add Todo</Button>
const DeleteButton = () => <Button><DeleteIcon />Add Todo</Button>;

// whereas with plain tailwind, you would have needed to define the classname on the icon itself
const AddButton = () => <Button><AddIcon className="text-gray-300" />Add Todo</Button>
const DeleteButton = () => <Button><DeleteIcon className="text-gray-300" />Add Todo</Button>;
```

### Grouping variants

Using twin.macro you can group variants via parentheses. This is particularly useful as our application defines a `dark:` variant. This is possible 
due to `twin.macro` being a `babel macro` and being able to compile the content of the parentheses down to what tailwind expects.
```tsx
// without twin.macro 
const Button = () => <button className="dark:bg-slate-100 dark:border-slate-200 dark:hover:bg-slate-300" />

// with twin macro 
const Button = () => <button className="dark:(bg-slate-100 border-slate-200 hover:bg-slate-300)" />
```

## Downsides of using twin.macro

Although twin.macro seemed like a good fit for us, we encountered several issues as the complexity of technology combinations increased.

### Issues with styled-components

We ran into some issues, as we integrated dark & light modes into our application. 
Due to [a bug in styled-components](https://github.com/styled-components/styled-components/issues/3265) not update to `styled.components > 5.11` due to this issue, which was now closed due to inactivity: https://github.com/ben-rogerson/twin.macro/issues/310.  
Leaving styled-components at version below `5.2.0` also had some implications once we tried to bootstrap a new application.  
We did not get a clean installation of Create React App 5 running combined with styled-component & twin.macro that was fully working, since the proposed workaround for [this issue]() was to use styled-components
in a version `>= 5.1.1`, which somehow caused issues with `react-scripts > v4`. Leaving CRA below version 5 also implied sticking to React 17. This restriction on the foundation of every web app we wrote was not something we wanted to live with.

> From my point of view, the general problem with this approach are the efforts you need to apply in maintaining the correct dependency versions, as well as the fear to touch them once you got it running.

### Waiting for new tailwind versions

twin.macro was always behind the current version of tailwindcss as it needed to implement support for every version. This was caused by the architecture of twin.macro before version `3.2.2`. Basically, each time tailwind introduced a new feature, twin.macro needed to implement this feature as
twin was taking care of matching and ordering the classnames that were passed to it, before passing them to tailwindcss.
**This is not the case anymore** as Ben Rogerson fundamentally changed the way twin.macro works within [this PR](https://github.com/ben-rogerson/twin.macro/pull/739).

### Having a dependency on a build tool within source code

As twin.macro leverages babel macros to parse & compile all occurrences of `tw` within the source code, it also introduces an implicit dependency on
babel as a build tool for our applications.  

```tsx
// all tw occurrences will be parsed by the babel macro 
const x = styled.div`${tw``}`

<div tw="bg-indigo-100" />
```

Especially when thinking about shared code, I do not want to introduce any restrictions in terms of build tools or dev servers for our projects. 
New build tools are on the horizon, that are likely to deprecate javascript-based bundlers, so opting-out of using `babel` is something I definitely want to be able for at least new projects.
- [https://turbo.build/pack](https://turbo.build/pack)  
- [https://esbuild.github.io/](https://esbuild.github.io/)  
- [https://swc.rs/](https://swc.rs/)


## Removing twin.macro 

Once we started creating a new component library for our company, we first thought of not using twin.macro within that codebase. Therefore, we still had to solve the
[child-element styling problem](#styling-child-elements) mentioned above. Additionally, we needed to re-think how conditional styling would be done without twin.macro using pure classnames

### Solving the child element problem

tailwind v3.1 introduced the so called `arbitrary variants`. This basically enables you to write queries on child elements as a variant directly within tailwind.

```tsx
// before with twin.macro & styled-components
const Button = styled.button`
    svg {
        ${tw`text-gray-300`}
    }
`

// with pure tailwind
const Button = ({ children }) => <button className="[&_svg]:text-gray-300">{children}</button>
```

See [https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants](https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants)
for more information.

### How to do conditional styling

To achieve conditional styling with regular classnames we can use a simple helper function called `classnames` which basically combines all the strings that it gets passed. It also can retrieve objects as an argument, where the key of the object is the classnames we want to apply, and the value is a boolean, which determines whether the classnames within the key get applied or not.

We decided to use the `classnames` package to achieve this, since it is well tested, covers a few more edge cases and ships with zero dependencies.

```tsx
import classNames from "classnames";

const ButtonWithConditional = ({props}) => { 
    return (
    <button className={classNames(
        "text-gray-300",
        { "bg-dark": props.disabled })}>
        Hallo
    </button>)
}
```