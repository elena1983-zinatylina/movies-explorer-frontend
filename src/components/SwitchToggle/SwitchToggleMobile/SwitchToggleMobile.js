export default function SwitchToggleMobile  ({
    position,
    name,
    handleCheckbox,
    checkboxValue,
  })  {
    return (
      <div className={`switch-toggle switch-toggle_mobile ${position}`}>
        <label
          className='switch-toggle__label hover-link'
          htmlFor='checkbox-mobile'
        >
          <input
            className='switch-toggle__input'
            type='checkbox'
            id='checkbox-mobile'
            onChange={handleCheckbox}
            checked={checkboxValue}
          />
          <span className='switch-toggle__slider'></span>
        </label>
        <p className='switch-toggle__name'>{name}</p>
      </div>
    );
  };