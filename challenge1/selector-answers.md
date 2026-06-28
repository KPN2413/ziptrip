# Question 4: CSS Selector Answers

HTML considered:

```html
01 <div id="container">
02   <div class="box"></div>
03
04   <div class="box2"></div>
05   <div>
06     <div class="box"></div>
07   </div>
08 </div>
09
10 <div class="box"></div>
```

| Selector | Selected line numbers | Why selected | Why others are not selected |
|---|---:|---|---|
| `.box` | 2, 6, 10 | Selects elements having class `box`. | Line 4 has class `box2`, not `box`. Line 1 and 5 have no class `box`. |
| `div .box` | 2, 6 | Selects `.box` elements that are descendants of a `div`. | Line 10 is outside the shown div container. Line 4 is `box2`, not `box`. |
| `div.box` | 2, 6, 10 | Selects `div` elements with class `box`. | Line 4 has class `box2`. Line 1 and 5 do not have class `box`. |
| `[class]` | 2, 4, 6, 10 | Selects every element having a `class` attribute. | Line 1 has only id. Line 5 has no class attribute. |
| `#container .box` | 2, 6 | Selects `.box` elements inside `#container`. | Line 10 is outside `#container`. Line 4 is `box2`, not `box`. |
| `#container > .box` | 2 | Selects direct child `.box` of `#container`. | Line 6 is nested inside another div, so it is not a direct child. Line 10 is outside `#container`. |
