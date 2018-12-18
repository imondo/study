class WebPrint {
  doPrint() {
    const bdhtml = window.document.body.innerHTML;
    console.log(bdhtml)
    const sprnstr = '<!--startprint-->';
    const eprnstr = '<!--endprint-->';
    let prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
    prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
    window.document.body.innerHTML = prnhtml;
    window.print();
  }
}

const webPrint = new WebPrint();

export default webPrint;
