import bgCircles from '../img/bg-circles.svg'
import bgSqaureDots from '../img/bg-square-dots.svg'


export const bg = `
  .bg-circles {
    position : absolute;
    inset : 0;
    z-index : 10;

    background-image : url(${ bgCircles });
    background-repeat : no-repeat;
    background-position : -150% 150%;
  }

  .bg-square-dots {
    position : absolute;
    inset : 0;
    z-index : 10;

    background-image : url(${ bgSqaureDots });
    background-repeat : no-repeat;
    background-position : right center;
    background-size : 15%;
  }
`