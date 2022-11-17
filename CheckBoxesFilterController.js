({
  onCheck: function (component, evt, helper) {
    let checkCmp = component.find("checkbox");
    component.set("v.CheckBox", checkCmp.get("v.value"));
    let check = component.get("v.CheckBox");

    if (!check) {
      component.set("v.data", "");
    } else {
      component.set("v.selectedVal", "");

      helper.loadContacts(component);
    }
  },

  handleChange: function (component, event, helper) {
    let checkCmp = component.find("checkbox");
    checkCmp.set("v.value", false);

    component.set("v.selectedVal", "");

    let selectedValues = event.getParam("value");

    component.set("v.selectedVal", selectedValues);

    let FiltersList = JSON.parse(JSON.stringify(selectedValues));

    component.set("v.ListValue", FiltersList);

    let stringSearch = [];
    FiltersList.forEach(function (obj) {
      stringSearch.push("%" + obj + "%");
    });

    component.set("v.ListValue", stringSearch);

    if (FiltersList) {
      helper.searchRecordOnFilter(component);
    } else {
      component.set("v.data", "");
    }
  },
});
