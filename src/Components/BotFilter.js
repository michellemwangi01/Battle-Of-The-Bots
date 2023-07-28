import React, { useState, useRef } from "react";

const BotFilter = ({ botData, setBotData }) => {
  let filteredByClassItems;
  const formRef = useRef(null);
  const [filterValues, setFilterValues] = useState({
    support: "",
    medic: "",
    assault: "",
    defender: "",
    captain: "",
    witch: "",
  });

  const inputHandler = (e) => {
    const { name, checked } = e.target;
    setFilterValues({ ...filterValues, [name]: checked ? e.target.value : "" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    filterUserSearchValues();
  };

  const handleFormSubmit = () => {
    formRef.current.submit(); // Programmatically trigger the form submission
  };

  //   console.log(filteredByClassItems);
  function filterUserSearchValues() {
    const { defender, support, medic, assault, captain, witch } = filterValues;
    filteredByClassItems = botData.filter(
      (botItem) =>
        botItem.bot_class.toLowerCase() == defender ||
        botItem.bot_class.toLowerCase() == medic ||
        botItem.bot_class.toLowerCase() == support ||
        botItem.bot_class.toLowerCase() == assault ||
        botItem.bot_class.toLowerCase() == captain ||
        botItem.bot_class.toLowerCase() == witch
    );
    setBotData(filteredByClassItems);
  }

  return (
    <div>
      {/* <p>Filter By Bot Class</p> */}
      <form
        ref={formRef}
        type="submit"
        id="filterForm"
        onSubmit={submitHandler}
      >
        <input
          className="botClassCheckboxFilter"
          onChange={inputHandler}
          type="checkbox"
          name="support"
          value="support"
        />
        <label>Support</label>
        <input
          className="botClassCheckboxFilter"
          onChange={inputHandler}
          type="checkbox"
          name="medic"
          value="medic"
        />
        <label>Medic</label>
        <input
          className="botClassCheckboxFilter"
          onChange={inputHandler}
          type="checkbox"
          name="assault"
          value="assault"
        />
        <label>Assault</label>
        <input
          className="botClassCheckboxFilter"
          onChange={inputHandler}
          type="checkbox"
          name="defender"
          value="defender"
        />
        <label>Defender</label>
        <input
          className="botClassCheckboxFilter"
          onChange={inputHandler}
          type="checkbox"
          name="captain"
          value="captain"
        />
        <label>Captain</label>
        <input
          className="botClassCheckboxFilter"
          onChange={inputHandler}
          type="checkbox"
          name="witch"
          value="witch"
        />
        <label>Witch</label>

        <button type="submit" id="submitFilter">
          Filter - {botData.length}
        </button>
      </form>
    </div>
  );
};

export default BotFilter;
