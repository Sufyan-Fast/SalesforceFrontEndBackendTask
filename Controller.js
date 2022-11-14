({
  Init: function (component, event, helper) {
    component.set("v.columns", [
      {
        label: "Name",
        fieldName: "linkName",
        type: "url",
        typeAttributes: { label: { fieldName: "Name" }, target: "_blank" },
      },
      { label: "Email", fieldName: "Email", type: "Email" },
      { label: "Phone", fieldName: "Phone", type: "Phone" },

      /*
             {label: 'Notes & Attachments', fieldName: 'NotesAndAttachments',type:'url',
             typeAttributes:{label: { fieldName: 'Name' }, target: '_blank'}},
            
           */
    ]);

    helper.loadContacts(component);
  },

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

  keyCheck: function (component, event, helper) {
    console.log("In key check function");
    let filtervalues = [];
    let groupFilter = [];
    if (event.which == 13) {
      console.log("in event.which");
      let checkCmp = component.find("checkbox");
      checkCmp.set("v.value", false);
      component.set("v.selectedVal", "");
      filtervalues = component.get("v.FilterText");
      console.log("line 55", filtervalues);

      groupFilter = component.get("v.GroupFilterText");
      console.log("line 58", groupFilter);
      //component.set("v.FilterText",  component.get("v.searchText"));
      filtervalues.push(component.get("v.searchText"));
      console.log("line 61", filtervalues);
      //let val = component.get("v.searchText");

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

  handleChange: function (component, event, helper) {
    //Get the Selected values
    //
    let checkCmp = component.find("checkbox");
    checkCmp.set("v.value", false);
    console.log("In handle change event");
    //component.set("v.selectedVal", "");
    console.log(component.get("v.selectedVal"));

    component.set("v.selectedVal", "");
    // console.log('Selected value after reset',component.get("v.selectedVal") );
    //
    //

    let selectedValues = event.getParam("value");
    //var filtervalue = event.target.value;
    //console.log('filter value',filtervalue );
    console.log("Selected values ", selectedValues);
    //Update the Selected Values

    component.set("v.selectedVal", selectedValues);

    //let obj1 = JSON.parse(JSON.stringify(selectedValues));

    //let obj = obj1.pop();
    //console.log('obj after pop', obj);
    console.log("Selected values ", component.get("v.selectedVal"));
    //component.set("v.selectedVal", obj);
    //console.log('Selected values ',component.get("v.selectedVal"));
    var objUncovered = JSON.parse(JSON.stringify(selectedValues));
    console.log("obj uncovered", objUncovered);

    //var values = objUncovered;
    //console.log('values', values);
    component.set("v.ListValue", objUncovered);
    console.log("List Value", component.get("v.ListValue"));

    let stringSearch = [];
    objUncovered.forEach(function (obj) {
      stringSearch.push("%" + obj + "%");
    });

    console.log("String Search", stringSearch);

    component.set("v.ListValue", stringSearch);

    console.log("String search", component.get("v.ListValue"));

    //var last = objUncovered.pop();
    //console.log('Last Value', last);
    //component.set("v.LastValue", last);
    //component.set("v.selectedVal", component.get("v.LastValue"));
    if (objUncovered) {
      helper.searchRecordOnFilter(component);
    } else {
      component.set("v.data", "");
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

      let checkCmp = component.find("checkbox");
      checkCmp.set("v.value", true);
      component.set("v.selectedVal", "");
      helper.loadContacts(component);
      //$A.enqueueAction(component.get('c.onCheck'));

      //
    }
  },
});
