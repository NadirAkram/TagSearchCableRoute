function myFunction() {
    // Get the text field
    var copyText = document.getElementById("myInput");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    alert("Copied the text: " + copyText.value);
  }
    
    
    let tags;
    let filename;
    let filepath;
    let from;
    let to;
    document.getElementById("search").onclick = function(){
        tags = document.getElementById("tag").value;
        filename = document.getElementById("filename").value;
        filepath = document.getElementById("filepath").value;
        from = document.getElementById("from").value;
        to = document.getElementById("to").value;

    const yourArray = tags.split("; ");
    const count = yourArray.length;
    
    const list = [];
    
    for (let i = 0; i < count; i++) {
        const string1 = `<condition test="contains" flags="74">
        <category>
          <name internal="LcRevitData_Custom">Custom</name>
        </category>
        <property>
          <name internal="lcldrevit_parameter_Raceway Sequence ID_PG_IDENTITYDATA">Raceway Sequence ID</name>
        </property>
        <value>
          <data type="wstring">${yourArray[i]}</data>
        </value>
      </condition>`;
      
        list.push(string1);
    }

    const newString = list.join("\n");

    const fromtostring = `<condition test="contains" flags="74"> 
    <category> <name internal="LcRevitData_Element">Element</name> 
    </category> <property> 
    <name internal="LcRevitPropertyElementName">Name</name> 
    </property> <value> <data type="wstring">${from}</data> 
    </value> </condition>
    <condition test="contains" flags="74"> 
    <category> <name internal="LcRevitData_Element">Element</name> 
    </category> <property> 
    <name internal="LcRevitPropertyElementName">Name</name> 
    </property> <value> <data type="wstring">${to}</data> 
    </value> </condition>`

    
    const finalString = `<?xml version="1.0" encoding="UTF-8" ?>

<exchange xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://download.autodesk.com/us/navisworks/schemas/nw-exchange-12.0.xsd" units="ft" filename="${filename}" filepath="${filepath}">
  <findspec mode="all" disjoint="0">
  <conditions>${newString}${fromtostring}
    </conditions>
    <locator>/</locator>
  </findspec>
</exchange>`;

        document.getElementById("myInput").textContent = `${finalString}`
    }
    
    
