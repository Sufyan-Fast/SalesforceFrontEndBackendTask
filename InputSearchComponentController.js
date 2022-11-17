({
  keyCheck: function (component, event, helper) {
    let groupFilter = [];
    if (event.which == 13) {
      let checkCmp = component.find("CheckBoxesFilterComponent");
      let childCheckBox = checkCmp.find("checkbox");
      childCheckBox.set("v.value", false);
      component.set("v.selectedVal", "");

      groupFilter = component.get("v.GroupFilterText");

      let filterValue = JSON.parse(
        JSON.stringify(component.get("v.GroupFilterText"))
      );

      let searchtext = component.get("v.searchText");

      let obj = filterValue.every(function (value) {
        if (value.value === searchtext) {
          return false;
        }

        return true;
      });

      if (obj) {
        groupFilter.push({
          label: component.get("v.searchText"),
          value: component.get("v.searchText"),
        });
      }

      component.set("v.GroupFilterText", groupFilter);

      component.set("v.options", groupFilter);
      component.set("v.selectedVal", component.get("v.searchText"));
      helper.searchRecord(component);
    }
  },

  handleInputChange: function (component, event, helper) {
    let value = component.get("v.searchText");

    if (!value) {
      let checkCmp = component.find("CheckBoxesFilterComponent");
      let childCheckBox = checkCmp.find("checkbox");
      childCheckBox.set("v.value", true);
      component.set("v.selectedVal", "");
      helper.loadContacts(component);
    }
  },
});
