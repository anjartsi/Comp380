var chapterNav = document.getElementById("chapterNav");
var pageType = document.getElementById("pageType");
var e = "";
var s = "";
if (pageType.name == "explanation") 
	e = "active";

else if (pageType.name == "sampleProblems")
	s = "active";
createLink(chapterNav, "Explanation", "index.html", e);
createLink(chapterNav, "Sample Problems", "sampleProblems.html", s);



