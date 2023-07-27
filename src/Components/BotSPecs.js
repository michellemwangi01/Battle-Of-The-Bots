import React from "react";

const BotSPecs = ({ setViewBotDetailsBool, selectedBot }) => {
  const {
    avatar_url,
    armor,
    bot_class,
    catchphrase,
    created_at,
    damage,
    health,
    name,
    updated_at,
  } = selectedBot[0];

  function backToCollection() {
    console.log("I was clicked");
    setViewBotDetailsBool(false);
  }

  return (
    <div>
      <div onDoubleClick={backToCollection} class="projcard-container">
        <i class="fa-regular fa-rectangle-xmark"></i>
        <div class="projcard projcard-blue">
          <div class="projcard-innerbox">
            <div>
              <img class="projcard-img" src={avatar_url} />
            </div>
            <div class="projcard-textbox">
              <div class="projcard-title">
                {" "}
                <em>Name:</em> {name.toUpperCase()}
              </div>
              <div class="projcard-subtitle">
                <em>Catchphrase:</em> <br /> {catchphrase}
              </div>
              <div class="projcard-bar"></div>
              <div class="projcard-tagbox">
                <div class="projcard-tag">
                  <p className="botDeets">
                    <i class="fa fa-shield"></i>Class: {bot_class}
                  </p>
                </div>
                <span class="projcard-tag">
                  {" "}
                  <p className="botDeets">Health: {health}</p>
                </span>
                <span class="projcard-tag">
                  {" "}
                  <p className="botDeets">Damage: {damage}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotSPecs;
