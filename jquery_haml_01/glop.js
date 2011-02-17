$(function(){
  2// Render the page
  3$("body").haml(
    4 [".ui-widget-overlay"],
    5 ["%table",{css:{position:"absolute","margin-top":"2em"}},
       6 ["%tr",
          7 ["%td", {style:"vertical-align:top;padding: 0 10px"},
             8 ["%p.ui-state-default.ui-corner-all.ui-helper-clearfix", {style: "padding:4px;" },
                9 ["%span.ui-icon.ui-icon-volume-on", {style: "float:left; margin:-2px 5px 0 0;" }],
                10 "Master volume"
                11 ],
             12 ["%div", {style: "width:260px; margin:15px;", $:{
               13 slider: [{
                 14 value: 60
                 15 }]
               16 }}],
             17 ["%p.ui-state-default.ui-corner-all", {style:"padding:4px;margin-top:4em;" },
                 18 ["%span.ui-icon.ui-icon-signal", {style: "float:left; margin:-2px 5px 0 0;" }],
                 19 "Graphic EQ"
                 20 ],
             21 ["%div", $.map([88, 77, 55, 33, 40, 45, 70], function (v) {
               22 return [["%span", {
                 23 css: {height: "120px", "float": "left", margin: "15px"},
                 24 $: {slider:[{value:v,range:"min",animate:true,orientation:"vertical"}]}
                 25 }]];
               26 })],
             27 ["%p.ui-state-default.ui-corner-all", {style:"padding:4px;margin-top:4em;clear:both;" },
                 28 ["%span.ui-icon.ui-icon-calendar", {style: "float:left; margin:-2px 5px 0 0;" }],
                 29 "Date Picker"
                 30 ],
             31 ["%div", {$:{datepicker:[]}}]
             32 ],
          33 ["%td", {style:"vertical-align:top;padding: 0 10px;width:400px"},
              34 ["%p.ui-state-default.ui-corner-all", {style:"padding:4px;" },
                  35 ["%span.ui-icon.ui-icon-calendar", {style: "float:left; margin:-2px 5px 0 0;" }],
                  36 "Accordion"
                  37 ],
              38 ["%div", {$:{accordion:[]}},
                  39 ["%h3", ["%a",{href:"#"}, "Section 1"]],
                  40 ["%div",
                      41 ["%p", "Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate."]
                      42 ],
                  43 ["%h3", ["%a",{href:"#"}, "Section 2"]],
                  44 ["%div",
                      45 ["%p", "Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor velit, faucibus interdum tellus libero ac justo. Vivamus non quam. In suscipit faucibus urna."]
                      46 ],
                  47 ["%h3", ["%a",{href:"#"}, "Section 3"]],
                  48 ["%div",
                      49 ["%p", "Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis. Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac libero ac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui."],
                      50 ["%ul",
                          51 ["%li", "List item one"],
                          52 ["%li", "List item two"],
                          53 ["%li", "List item three"]
                          54 ]
                      55 ],
                  56 ["%h3", ["%a",{href:"#"}, "Section 4"]],
                  57 ["%div",
                      58 ["%p", "Cras dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean lacinia mauris vel est."],
                      59 ["%p", "Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."]
                      60 ]
                  61 ]
              62 ],
          63 ["%td", {style:"vertical-align:top;width:430px;padding: 0 10px;"},
              64 ["%p.ui-state-default.ui-corner-all", {style:"padding:4px;" },
                  65 ["%span.ui-icon.ui-icon-calculator", {style: "float:left; margin:-2px 5px 0 0;" }],
                  66 "Tabs"
                  67 ],
              68 ["%div", {$:{tabs:[]}},
                  69 ["%ul",
                      70 ["%li", ["%a",{href:"#tabs-1"}, "Nunc tincidunt"]],
                      71 ["%li", ["%a",{href:"#tabs-2"}, "Proin dolor"]],
                      72 ["%li", ["%a",{href:"#tabs-3"}, "Aenean lacinia"]]
                      73 ],
                  74 ["#tabs-1",
                      75 ["%p", "Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus."]
                      76 ],
                  77 ["#tabs-2",
                      78 ["%p", "Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus."]
                      79 ],
                  80 ["#tabs-3",
                      81 ["%p", "Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus."],
                      82 ["%p", "Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit."]
                      83 ]
                  84 ],
              85 ["%p.ui-state-default.ui-corner-all", {style:"padding:4px;margin-top:4em;" },
                  86 ["%span.ui-icon.ui-icon-lightbulb", {style: "float:left; margin:-2px 5px 0 0;" }],
                  87 "Highlight / Error"
                  88 ],
              89 [".ui-widget",
                  90 [".ui-state-highlight.ui-corner-all", {style: "padding: 0pt 0.7em; margin-top: 20px;"},
                      91 ["%p",
                          92 ["%span.ui-icon.ui-icon-info", {style: "float: left; margin-right: 0.3em;"} ],
                          93 ["%strong", "Hey!"],
                          94 "Sample ui-state-highlight style."
                          95 ]
                      96 ]
                  97 ],
              98 ["%br"],
              99 [".ui-widget",
                  100 [".ui-state-error.ui-corner-all", {style: "padding: 0pt 0.7em; margin-top: 20px;"},
                       101 ["%p",
                            102 ["%span.ui-icon.ui-icon-alert", {style: "float: left; margin-right: 0.3em;"} ],
                            103 ["%strong", "Alert:"],
                            104 "Sample ui-state-error style."
                            105 ]
                       106 ]
                  107 ]
              108 ]
          109 ]
       110 ]
    111);
  112
  113}); 
