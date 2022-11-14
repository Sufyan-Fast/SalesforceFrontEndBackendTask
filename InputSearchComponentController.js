({
  keyCheck: function (component, event, helper) {
    console.log("In key check function");
    let filtervalues = [];
    let groupFilter = [];
    if (event.which == 13) {
      console.log("in event.which");
      let checkCmp = component.find("CheckBoxesFilterComponent");
      let childCheckBox = checkCmp.find("checkbox");
      childCheckBox.set("v.value", false);
      component.set("v.selectedVal", "");
      filtervalues = component.get("v.FilterText");
      console.log("line 55", filtervalues);

      groupFilter = component.get("v.GroupFilterText");
      console.log("line 58", groupFilter);

      filtervalues.push(component.get("v.searchText"));
      console.log("line 61", filtervalues);

      let filterValue = JSON.parse(
        JSON.stringify(component.get("v.GroupFilterText"))
      );

      console.log("Line 64 Filter Value", filterValue);

      let searchtext = component.get("v.searchText");
      console.log("searchtext", searchtext);
      let obj = filterValue.every(function (value) {
        if (value.value === searchtext) {
          console.log("value", value.value, value.label);
          return false;
        }
        console.log("value", value.value, value.label);
        return true;
      });
      console.log("obj ", obj);
      if (obj) {
        groupFilter.push({
          label: component.get("v.searchText"),
          value: component.get("v.searchText"),
        });
      }

      component.set("v.FilterText", filtervalues);
      component.set("v.GroupFilterText", groupFilter);
      console.log("Group filter", component.get("v.GroupFilterText"));
      component.set("v.options", groupFilter);
      component.set("v.selectedVal", component.get("v.searchText"));
      helper.searchRecord(component);
      //component.set("v.searchText", "");
    }
  },

  handleInputChange: function (component, event, helper) {
    console.log("In handle input change function");

    //let value = event.target.value;

    let value = component.get("v.searchText");

    console.log("value ", value);

    if (value) {
      console.log("Not null");
    } else {
      console.log("Null");

      let checkCmp = component.find("CheckBoxesFilterComponent");
      let childCheckBox = checkCmp.find("checkbox");
      childCheckBox.set("v.value", true);
      component.set("v.selectedVal", "");
      helper.loadContacts(component);
    }
  },
});
