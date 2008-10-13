fao.f.btns = function(){
  function onGearDesktopReady() {
      var oGearDeskopButton = new YAHOO.widget.Button("gear_desktop");
      YAHOO.util.Event.addListener(oGearDeskopButton,"click",fao.variables.offstore.switch_state);
  }
  YAHOO.util.Event.onContentReady("gear_desktop", onGearDesktopReady); 

  function onSwitchReady() {
      var oSwitchButton = new YAHOO.widget.Button("switch_btn");
      YAHOO.util.Event.addListener(oSwitchButton,"click",fao.variables.offstore.switch_state);
  }
  YAHOO.util.Event.onContentReady("switch_btn", onSwitchReady); 
}
