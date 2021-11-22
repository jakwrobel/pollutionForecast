//Renders info about app
import React from "react";

const About = () => {
  return (
    <section className="about__wrap">
      <article>
        <p>
          Welcome to 72 hours air pollution forecast. Here you can check
          forecast for every place on Earth, you only have to write city name in
          the browser above.
        </p>
        <p>
          Forecast predicts general AQI (Air quality Index), exact level of 4
          harmful chemical compounds: O3, SO2, NO2, CO and level of 2
          particulates: PM 10 and PM 25. Move cursor on info sign over overy
          graph, to read more info about every pollution.
        </p>
        <p>
          Attention! Page shows current pollution level, but it doesn't refresh
          automatically every 1 hour
        </p>
      </article>
    </section>
  );
};

export default About;
