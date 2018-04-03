import HtmlRenderer from "./html-renderer";
import script from "./script.txt";

const renderer = new HtmlRenderer(script);
window.renderer = renderer; // expose renderer globally to make it easier to play around with