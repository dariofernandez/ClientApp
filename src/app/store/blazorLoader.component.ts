import { Component } from "@angular/core";


@Component({
  selector: "blazor",
  template: "<app></app>"
})

    //  Angular doesn’t allow script elements to be defined in templates and will silently remove them as a
    //  security precaution.This is a barrier to integrating Blazor because I need to be able to load the _framework /
    //  blazor.webassembly.js file.To accommodate this restriction, the component in Listing 10 - 18 uses the
    //  JavaScript DOM API to create a script element and inserts it into the head element of the HTML document.
    //  The component uses the template property to define the app element into which Blazor will render its
    //  content.

export class BlazorLoader {
  template: any = "";

  ngOnInit() {
    if (!document.getElementById("blazorScript")) {
      let scriptElem = document.createElement("script");
      scriptElem.type = "text/javascript";
      scriptElem.id = "blazorScript";
      scriptElem.src = "_framework/blazor.webassembly.js";
      document.getElementsByTagName("head")[0].appendChild(scriptElem);
    }

  }
}
