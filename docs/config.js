/* global docuteIframe Docute */

Vue.component('logo', {
  template: `<div>
    <div class="box">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 400 200"
        class="svg"
      >
        <defs>
          <g id="vue">
            <path
              fill="#4dba87"
              d="M 0,0 -22.669,39.264 -45.338,0 h -75.491 L -22.669,170.017 75.491,0 Z"
            ></path>
            <path
              fill="#435466"
              d="M 0,0 -22.669,39.264 -45.338,0 H -81.565 L -22.669,102.01 36.227,0 Z"
            ></path>
          </g>

          <clipPath id="cut1">
            <rect x="0" y="0" width="150" height="200"></rect>
          </clipPath>
          <clipPath id="cut2">
            <rect x="250" y="0" width="150" height="200"></rect>
          </clipPath>
        </defs>

        <g clip-path="url(#cut1)">
          <g class="anim">
            <use transform="translate(173, 30)" xlink:href="#vue"></use>
          </g>
        </g>
        <g clip-path="url(#cut2)">
          <g class="anim">
            <use transform="translate(273, 30)" xlink:href="#vue"></use>
          </g>
        </g>
        <line x1="150" y1="20" x2="150" y2="200" stroke="#579BDD"></line>
        <line x1="250" y1="20" x2="250" y2="200" stroke="#DA9022"></line>
      </svg>
    </div>
    <v-style>
    @keyframes anim {
      0% {
        transform: translate(-50px) rotate(10deg);
  }

  100% {
    transform: translate(50px) rotate(-10deg);
  }
  }

  .svg {
    width: 45vw;
    height: 22.5vw;
    margin: 0 auto;
  }

  .anim {
  transform-origin: 50% 50%;
  animation: anim 1s alternate infinite ease-in-out;
  }

  line {
  stroke-width: 5px;
  stroke-linecap: round;
  }

  .h1 {
  font-size: 48px;
  text-align: center;
  }

  .button {
  font-size: 24px;
  border: 2px solid #42b983;
  color: #42b983;
  border-radius: 5px;
  padding: 10px 15px;
  }

  .box {
  padding: 30px 0;
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
  }
  </v-style>
      </div>
  `,
})

new Docute({
  target: '#app',
  nav: [
    { title: 'PortalVue', link: '/' },

    {
      title: 'Documentation',
      link: '/guide',
    },
    {
      title: 'Github',
      link: 'https://github.com/linusborg/portal-vue',
    },
  ],
  sidebar: [
    {
      title: 'Guide',
      links: [
        { title: 'Usage Guide', link: '/guide' },
        { title: 'Examples', link: '/examples' },
      ],
    },
    {
      title: 'API Documentation',
      links: [
        { title: 'Portal', link: '/docs/portal' },
        { title: 'PortalTarget', link: '/docs/portal-target' },
        { title: 'Wormhole', link: '/docs/wormhole' },
      ],
    },
    {
      title: 'Other',
      links: [{ title: 'Caveats', link: '/docs/caveats' }],
    },
  ],
})
