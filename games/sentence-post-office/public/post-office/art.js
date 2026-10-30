const wrap = (body, cls = "", viewBox = "0 0 100 100") =>
  `<svg class="art ${cls}" viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
export function icon(name, cls = "") {
  const shapes = {
    mail: '<rect x="14" y="25" width="72" height="51" rx="9" fill="currentColor"/><path d="m18 30 32 25 32-25" stroke="#fff5dc" stroke-width="6" stroke-linejoin="round"/>',
    flag: '<path d="M27 85V16" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M32 18h46L66 36l12 17H32" fill="currentColor"/><path d="M23 86h26" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>',
    bridge:
      '<path d="M13 65h74M22 39v40m56-40v40M23 47c16 19 38 19 54 0" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M37 58v12m26-12v12" stroke="currentColor" stroke-width="5"/>',
    stamp:
      '<path d="M15 18h70v64H15z" stroke="currentColor" stroke-width="10" stroke-dasharray="8 5"/><rect x="25" y="28" width="50" height="44" rx="4" fill="currentColor"/><circle cx="50" cy="50" r="11" fill="#fff5dc"/>',
    sound:
      '<path d="m19 39 15-1 19-17v58L34 62H19z" fill="currentColor"/><path d="M66 36q16 14 0 28m11-42q30 28 0 56" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
    mute: '<path d="m19 39 15-1 19-17v58L34 62H19z" fill="currentColor"/><path d="m67 38 20 24m0-24L67 62" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
    arrow:
      '<path d="M21 50h57M57 28l22 22-22 22" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
    back: '<path d="M79 50H22m21-22L21 50l22 22" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
    home: '<path d="m13 46 37-31 37 31" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 42v41h54V42" fill="currentColor"/><path d="M44 62h15v22H44z" fill="#fff5dc"/>',
    check:
      '<path d="m24 51 17 18 36-40" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>',
    help: '<path d="M36 33c0-20 36-20 36 0 0 14-22 13-22 29" stroke="currentColor" stroke-width="8" stroke-linecap="round"/><circle cx="50" cy="80" r="5" fill="currentColor"/>',
    star: '<path d="m50 12 11 24 27 3-20 19 6 28-24-14-24 14 6-28L12 39l27-3z" fill="currentColor"/>',
    close:
      '<path d="m27 27 46 46m0-46L27 73" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>',
    parent:
      '<circle cx="50" cy="29" r="14" stroke="currentColor" stroke-width="6"/><path d="M23 83v-9a27 27 0 0 1 54 0v9" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
    grid: '<rect x="16" y="16" width="26" height="26" rx="5" fill="currentColor"/><rect x="58" y="16" width="26" height="26" rx="5" fill="currentColor"/><rect x="16" y="58" width="26" height="26" rx="5" fill="currentColor"/><rect x="58" y="58" width="26" height="26" rx="5" fill="currentColor"/>',
    sun: '<circle cx="50" cy="50" r="22" fill="#ecc168"/><path d="M50 8v9m0 66v9M8 50h9m66 0h9M20 20l7 7m46 46 7 7m0-60-7 7M27 73l-7 7" stroke="#ecc168" stroke-width="6" stroke-linecap="round"/>',
    moon: '<path d="M70 16C18 14 13 79 62 84c16 1 25-7 28-18C48 82 32 35 70 16Z" fill="#e5b65f"/><circle cx="66" cy="37" r="3" fill="#827392"/><path d="m81 29 3-8 4 8 8 3-8 3-4 8-3-8-8-3z" fill="#a79bc6"/>',
    stars:
      '<path d="m50 10 11 25 27 3-20 20 6 27-24-14-24 14 6-27-20-20 27-3z" fill="#e7b95c"/><circle cx="44" cy="49" r="2.5" fill="#715a36"/><circle cx="57" cy="49" r="2.5" fill="#715a36"/><path d="M45 59q5 5 10 0" stroke="#715a36" stroke-width="2" stroke-linecap="round"/>',
    gift: '<path d="M19 46h62v40H19z" fill="#e2a1a0"/><rect x="13" y="35" width="74" height="16" rx="4" fill="#df7956"/><path d="M46 35h9v51h-9z" fill="#f8d991"/><path d="M48 33C3 28 42 3 50 30c10-28 46-3 6 3" stroke="#df7956" stroke-width="7" stroke-linecap="round"/>',
    cake: '<path d="M19 44h62v39H19z" fill="#e4ad7c"/><path d="M18 44q4-22 33-21t31 21v12q-8 12-16 0-8 12-16 0-8 12-16 0-8 12-16 0z" fill="#fff8df" stroke="#d9ba92" stroke-width="2"/><path d="M50 15v15" stroke="#df7956" stroke-width="7"/><path d="M50 3q12 12 0 14-10-5 0-14" fill="#edbd64"/><path d="M11 84h78" stroke="#48877e" stroke-width="5" stroke-linecap="round"/>',
    flowers:
      '<path d="M50 53v35m0-14q-25-18-29-6 8 22 29 15m0-15q21-22 29-10-3 22-29 19" stroke="#79a27c" stroke-width="5" fill="#9ab991"/><path d="M50 16c22-15 34 11 15 22 25 14 4 37-15 20-20 18-39-7-16-20-20-16-2-38 16-22Z" fill="#de9690"/><circle cx="50" cy="37" r="11" fill="#edc36b"/>',
    water:
      '<path d="M12 61h76L69 80H31z" fill="#5c9ca4"/><path d="M48 14v45H19z" fill="#f9e8b7"/><path d="M53 25v34h27z" fill="#dc936c"/><path d="M7 87q12-9 24 0t24 0 24 0" stroke="#7da9b6" stroke-width="4" stroke-linecap="round"/>',
    hat: '<path d="m27 60 7-36h34l9 36" fill="#648e83"/><path d="M15 60q35-12 70 0v12H15z" fill="#3d6f65"/><path d="M33 46h36v10H33z" fill="#e5b76b"/><path d="M64 20q-4-18 14-17 0 17-14 17" fill="#df7956"/>',
    song: '<path d="M33 66V27l42-10v40" stroke="#8580ad" stroke-width="7" stroke-linejoin="round"/><ellipse cx="23" cy="71" rx="14" ry="10" fill="#8580ad" transform="rotate(-20 23 71)"/><ellipse cx="65" cy="62" rx="14" ry="10" fill="#8580ad" transform="rotate(-20 65 62)"/><path d="m33 39 42-10" stroke="#8580ad" stroke-width="7"/>',
    train:
      '<rect x="12" y="39" width="51" height="34" rx="8" fill="#df7956"/><path d="M55 23h30v50H55z" fill="#518d80"/><path d="M52 20h36" stroke="#346b60" stroke-width="7" stroke-linecap="round"/><rect x="62" y="30" width="15" height="18" rx="3" fill="#fff5dc"/><path d="M20 26h12v14H20z" fill="#346b60"/><circle cx="29" cy="75" r="12" fill="#346b60"/><circle cx="70" cy="75" r="12" fill="#346b60"/><circle cx="29" cy="75" r="5" fill="#efcd8a"/><circle cx="70" cy="75" r="5" fill="#efcd8a"/>',
  };
  return wrap(shapes[name] || shapes.mail, cls);
}

export function animal(name = "fox", cls = "") {
  const palettes = {
    fox: ["#df9466", "#f9e9cc"],
    bunny: ["#e9d8bf", "#fff6e5"],
    bear: ["#b88b64", "#eed4a6"],
    cat: ["#e9b565", "#fff0cf"],
  };
  const [fur, face] = palettes[name] || palettes.fox;
  const ears =
    name === "bunny"
      ? `<ellipse cx="36" cy="24" rx="9" ry="24" fill="${fur}" transform="rotate(-10 36 24)"/><ellipse cx="65" cy="24" rx="9" ry="24" fill="${fur}" transform="rotate(10 65 24)"/><path d="m36 11 2 25m26-25-2 25" stroke="#d8a5a0" stroke-width="6" stroke-linecap="round"/>`
      : name === "bear"
        ? `<circle cx="24" cy="36" r="15" fill="${fur}"/><circle cx="76" cy="36" r="15" fill="${fur}"/><circle cx="24" cy="36" r="8" fill="${face}"/><circle cx="76" cy="36" r="8" fill="${face}"/>`
        : `<path d="m16 55 3-40 28 22m8 0 27-22 3 40" fill="${fur}"/><path d="m24 40 1-14 15 13m21 0 15-13 2 14" fill="#e7afa2"/>`;
  return wrap(
    `<path d="M25 104c-9-36 58-36 50 0" fill="#62978c"/>${ears}<ellipse cx="50" cy="58" rx="37" ry="32" fill="${fur}"/><path d="M17 54q15-7 33 12 18-19 33-12 0 31-33 32-33-1-33-32" fill="${face}"/><ellipse cx="35" cy="57" rx="3" ry="4" fill="#3f534b"/><ellipse cx="65" cy="57" rx="3" ry="4" fill="#3f534b"/><ellipse cx="24" cy="68" rx="7" ry="4" fill="#dfaba0" opacity=".65"/><ellipse cx="76" cy="68" rx="7" ry="4" fill="#dfaba0" opacity=".65"/><path d="m46 67 4 5 4-5" fill="#4d554b"/><path d="M50 72q-6 7-11 1m11-1q6 7 11 1" stroke="#4d554b" stroke-width="2" stroke-linecap="round"/><path d="M35 91h30v10H35z" fill="#e3b663"/>`,
    cls,
    "0 0 100 105",
  );
}

export function landscape(cls = "") {
  return wrap(
    `<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#d8eae4"/><stop offset="1" stop-color="#edf0dc"/></linearGradient></defs>
    <rect width="1440" height="480" fill="url(#sky)"/>
    <g class="cloud cloud-one" fill="#fff9e8" opacity=".9"><path d="M779 96c-4-36 39-44 52-20 23-47 76-29 74 8 40-9 47 34 11 37H779c-25-2-27-23 0-25Z"/><path d="M118 100c-4-22 24-33 38-15 16-34 53-19 50 7 28-4 39 22 11 26h-94c-19-1-21-17-5-18Z"/></g>
    <circle cx="1204" cy="89" r="41" fill="#edc574"/><circle cx="1193" cy="88" r="2.5" fill="#bd8b47"/><circle cx="1215" cy="88" r="2.5" fill="#bd8b47"/><path d="M1198 99q6 5 12 0" stroke="#bd8b47" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M0 298Q190 85 386 249T764 233t397-8 279 28v227H0Z" fill="#b3cfc0"/><path d="M0 329q243-153 470-36t449-1 521-17v205H0Z" fill="#90b6a4"/><path d="M0 384q226-106 487-14t537-20 416 19v111H0Z" fill="#7ca393"/>
    <g fill="#659582"><path d="m1240 133-51 127h102z"/><path d="m1308 169-41 99h82z"/><path d="m1136 197-35 85h70z"/><path d="m989 199-30 76h60z"/></g><g fill="#6f8061"><rect x="1236" y="242" width="8" height="70" rx="4"/><rect x="1305" y="248" width="7" height="59" rx="3"/></g>
    <g class="post-building" transform="translate(915 170)"><path d="M17 91h213v170H17z" fill="#f5dfb1"/><path d="m0 94 124-90 124 90z" fill="#b96250"/><path d="m5 90 119-86 119 86" stroke="#935b49" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 153h52v108H44z" fill="#619186"/><path d="M53 162h34v56H53z" fill="#bdd0b1"/><circle cx="85" cy="230" r="3" fill="#f5dfb1"/><rect x="132" y="151" width="67" height="62" rx="5" fill="#fff5db" stroke="#d1ae7f" stroke-width="5"/><path d="M165 154v56m-29-28h59" stroke="#d1ae7f" stroke-width="4"/><rect x="80" y="88" width="88" height="35" rx="4" fill="#fff1cd"/><path d="M103 96h41v21h-41z" fill="#b96250"/><path d="m104 97 19 13 20-13" stroke="#fff1cd" stroke-width="3"/><path d="M5 262h236" stroke="#648571" stroke-width="8" stroke-linecap="round"/></g>
    <g transform="translate(811 303)"><rect x="0" y="0" width="37" height="68" rx="12" fill="#d77759"/><path d="M5 23h27" stroke="#974f41" stroke-width="5"/><path d="M18 68v51" stroke="#797d5a" stroke-width="7"/><path d="M7 10h22" stroke="#f9dcb0" stroke-width="3" stroke-linecap="round"/></g>
    <path d="M0 447h1440" stroke="#e5cf9c" stroke-width="18"/><path d="M0 446h1440" stroke="#a69570" stroke-width="3" stroke-dasharray="16 13"/>
    <g fill="#edca78"><circle cx="738" cy="398" r="5"/><circle cx="122" cy="389" r="5"/><circle cx="1302" cy="401" r="5"/><circle cx="643" cy="411" r="4"/></g><g stroke="#477c65" stroke-width="3"><path d="M738 403v14m-616-23v15m1180-3v16m-659-6v12"/></g>`,
    cls,
    "0 0 1440 480",
  );
}

export function train(cls = "") {
  return `<div class="postal-train ${cls}" aria-hidden="true"><span class="smoke s1"></span><span class="smoke s2"></span><span class="smoke s3"></span><div class="locomotive"><div class="train-flag">${icon("flag")}</div><div class="chimney"></div><div class="engine-body"><span class="engine-mark">${icon("mail")}</span></div><div class="cab-roof"></div><div class="cab">${animal("fox", "driver")}</div><i class="wheel w1"></i><i class="wheel w2"></i><div class="bumper"></div></div><div class="coupler c1"></div><div class="carriage">${icon("mail", "parcel")}<i class="wheel w1"></i><i class="wheel w2"></i></div><div class="coupler c2"></div><div class="carriage last">${icon("gift", "parcel")}<i class="wheel w1"></i><i class="wheel w2"></i></div></div>`;
}
