({
  onCheck: function (cmp, evt, helper) {
    console.log("In oncheck function");

    let checkCmp = cmp.find("checkbox");
    cmp.set("v.CheckBox", checkCmp.get("v.value"));
    let check = cmp.get("v.CheckBox");
    console.log(check);
    if (!check) {
      cmp.set("v.data", "");
    } else {
      cmp.set("v.selectedVal", "");
      console.log("after checking all", cmp.get("v.selectedVal"));
      helper.loadContacts(cmp);
    }
  },

  handleChange: function (component, event, helper) {
    //Get the Selected values
    //
    let checkCmp = component.find("checkbox");
    checkCmp.set("v.value", false);
    console.log("In handle change event");

    console.log(component.get("v.selectedVal"));

    component.set("v.selectedVal", "");

    let selectedValues = event.getParam("value");

    console.log("Selected values ", selectedValues);
    //Update the Selected Values

    component.set("v.selectedVal", selectedValues);

    console.log("Selected values ", component.get("v.selectedVal"));

    var objUncovered = JSON.parse(JSON.stringify(selectedValues));
    console.log("obj uncovered", objUncovered);

    component.set("v.ListValue", objUncovered);
    console.log("List Value", component.get("v.ListValue"));

    let stringSearch = [];
    objUncovered.forEach(function (obj) {
      stringSearch.push("%" + obj + "%");
    });

    console.log("String Search", stringSearch);

    component.set("v.ListValue", stringSearch);

    console.log("String search", component.get("v.ListValue"));

    if (objUncovered) {
      helper.searchRecordOnFilter(component);
    } else {
      component.set("v.data", "");
    }
  },
});
