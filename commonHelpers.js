import"./assets/modulepreload-polyfill-ec808ebb.js";import{f,i as h}from"./assets/vendor-651d7991.js";let a,r=document.querySelector("[data-start]");r.addEventListener("click",S);s();const y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){a=t[0],a<Date.now()?(h.warning({message:"Please choose a date in the future",position:"topRight"}),s()):i()}};f("#datetime-picker",y);function i(){r.disabled=!1}function s(){r.disabled=!0}function S(){s();let t=setInterval(()=>{let u=Date.now(),o=a-u,e={days:0,hours:0,minutes:0,seconds:0};o>0?e=M(o):(clearInterval(t),i()),document.querySelector("[data-days]").innerHTML=n(e.days),document.querySelector("[data-hours]").innerHTML=n(e.hours),document.querySelector("[data-minutes]").innerHTML=n(e.minutes),document.querySelector("[data-seconds]").innerHTML=n(e.seconds)},1e3)}function M(t){const c=Math.floor(t/864e5),d=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:c,hours:d,minutes:l,seconds:m}}function n(t){return t.toString().padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map
