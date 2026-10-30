/* ============================================================
   MEOW AUDIO APP v9.1 — app.js
   Todo incluido: Skins, Seasons, Playlists, Favoritos,
   Editor TUI, Crossfade, Normalización, Limitador,
   Drag & Drop, Carpeta entera, Nuevos visualizadores.
   ============================================================ */

'use strict';

// ============================================================
// CONSTANTES
// ============================================================
const DEFAULT_COVER = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1.5'><path d='M9 18V5l12-2v13'/><circle cx='6' cy='18' r='3'/><circle cx='18' cy='16' r='3'/></svg>";
const HI_RES_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='%23d4af37' rx='8'/><path d='M0 95 Q100 130 200 95 L200 200 L0 200 Z' fill='%23000000'/><text x='100' y='68' font-family='Arial Black, sans-serif' font-weight='900' font-size='56' fill='%23000000' text-anchor='middle'>Hi-Res</text><text x='100' y='165' font-family='Arial, sans-serif' font-weight='900' font-size='42' fill='%23d4af37' text-anchor='middle'>AUDIO</text></svg>`;

const FAVORITES_PLAYLIST_NAME = '❤️ Favoritas';
const FAVORITES_ICON = '❤️';

const SEASONS_ASCII = {
  christmas: `        .    *    .       .       *      .    .    *
    .      .      .    *    .   .      .      .   .
  .    *    .    .       .      .    *    .    *   .
      .        .    *    .    .      .      .    .
  *    .    .      .      *    .    .    .    *    .
     .      *    .    .      .    *    .      .    .
   .    .    .      .    *    .      .    *    .  .
`,
  halloween: `         ,     ,
        /(     )\\
       /  \\___/  \\
      |  o     o  |
      |     ^     |
      |  \\_____/  |
       \\_________/
        /       \\
       /  /   \\  \\
      /  /     \\  \\
`,
  cyberpunk: `    ___________________________
   /  _______________________  \\
  /  /                       \\  \\
 /  /   C Y B E R P U N K     \\  \\
/  /                           \\  \\
\\  \\    2 0 7 7  //  N E O N   /  /
 \\  \\_________________________/  /
  \\_____________________________/
       ||               ||
       ||               ||
`,
  matrix: `    01001000 01100101 01101100 01101100 01101111
    01010111 01101111 01110010 01101100 01100100
    01010100 01101000 01100101 00100000 01001101
    01100001 01110100 01110010 01101001 01111000
    01101000 01100001 01110011 00100000 01111001
    01101111 01110101 00100000 01001110 01100101
    01101111 00100000 01010111 01100001 01101011
`
};

// ============================================================
// DISTROS
// ============================================================
const DISTROS_01 = [
  { id: 'arch', name: 'Arch Linux', color: '#1793d1', ascii: `                  -\`
                 .o+\`
                \`ooo/
               \`+oooo:
              \`+oooooo:
              -+oooooo+:
            \`/:-:++oooo+:
           \`/++++/+++++++:
          \`/++++++++++++++:
         \`/+++ooooooooooooo/\`
        ./ooosssso++osssssso+\`
       .oossssso-\`\`\`\`/ossssss+\`
      -osssssso.      :ssssssso.
     :osssssss/        osssso+++.
    /ossssssss/        +ssssooo/-
  \`/ossssso+/:-        -:/+osssso+-
 \`+sso+:-\`                 \`.-/+oso:
\`++:.                           \`-/+/.
.                                 /` },
  { id: 'ubuntu', name: 'Ubuntu', color: '#e95420', ascii: `                             ....
              .',:clooo:  .:looooo:.
           .;looooooooc  .oooooooooo'
        .;looooool:,''.  :ooooooooooc
       ;looool;.         'oooooooooo,
      ;clool'             .cooooooc.  ,,
         ...                ......  .:oo,
  .;clol:,.                        .loooo'
 :ooooooooo,                        'ooool
'ooooooooooo.                        loooo.
'ooooooooool                         coooo.
 ,loooooooc.                        .loooo.
   .,;;;'.                          ;ooooc
       ...                         ,ooool.
    .cooooc.              ..',,'.  .cooo.
      ;ooooo:.           ;oooooooc.  :l.
       .coooooc,..      coooooooooo.
         .:ooooooolc:. .ooooooooooo'
           .':loooooo;  ,oooooooooc
               ..';::c'  .;loooo:'` },
  { id: 'debian', name: 'Debian', color: '#d70a53', ascii: `        _,met\$\$\$\$\$\$\$\$\$\$gg.
     ,g\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$P.
   ,g\$\$\$\$P""       """Y\$\$\$\$.".
  ,\$\$\$\$P'              \`\$\$\$\$\$\$.
',\$\$\$\$P       ,ggs.     \`\$\$\$\$b:
\`d\$\$\$\$'     ,\$P"'   .    \$\$\$\$\$\$
 \$\$\$\$P      d\$'     ,    \$\$\$\$P
 \$\$\$\$:      \$\$\$.   -    ,d\$\$\$\$'
 \$\$\$\$;      Y\$b._   _,d\$P'
 Y\$\$\$\$.    \`.\`"Y\$\$\$\$\$\$\$\$P"'
 \`\$\$\$\$b      "-.__
  \`Y\$\$\$\$b
   \`Y\$\$\$\$.
     \`\$\$\$\$b.
       \`Y\$\$\$\$b.
         \`"Y\$\$b._
             \`""""` },
  { id: 'fedora', name: 'Fedora', color: '#51a2da', ascii: `             .',;::::;,'.
         .';:cccccccccccc:;,.
      .;cccccccccccccccccccccc;.
    .:cccccccccccccccccccccccccc:.
  .;ccccccccccccc;.:dddl:.;ccccccc;.
 .:ccccccccccccc;OWMKOOXMWd;ccccccc:.
.:ccccccccccccc;KMMc;cc;xMMc;ccccccc:.
,cccccccccccccc;MMM.;cc;;WW:;cccccccc,
:cccccccccccccc;MMM.;cccccccccccccccc:
:ccccccc;oxOOOo;MMM000k.;cccccccccccc:
cccccc;0MMKxdd:;MMMkddc.;cccccccccccc;
ccccc;XMO';cccc;MMM.;cccccccccccccccc'
ccccc;MMo;ccccc;MMW.;ccccccccccccccc;
ccccc;0MNc.ccc.xMMd;ccccccccccccccc;
cccccc;dNMWXXXWM0:;cccccccccccccc:,
cccccccc;.:odl:.;cccccccccccccc:,.
ccccccccccccccccccccccccccccc:'.
:ccccccccccccccccccccccc:;,..
 ':cccccccccccccccc::;,.` },
  { id: 'mint', name: 'Linux Mint', color: '#87cf3e', ascii: `           isMMMMMMMMMMMMMMMMMMh\`
         .MMMMMMMMMMMMMMMMMMMMMMB.
        dMMMMMMMMMMMMMMMMMMMMMMMMmd
      .MMMMMMMMMMMMMMMMMMMMMMMMMMMMh
     .MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.
     hMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh
    .MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.
    hMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh
    hMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh
    .MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.
     hMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh
     .MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.
      hMMMMMMMMMMMMMMMMMMMMMMMMMMMMh
        hmMMMMMMMMMMMMMMMMMMMMMMmh
          .dMMMMMMMMMMMMMMMMMMd.
              /hMMMMMMMMMMh/` },
  { id: 'opensuse', name: 'openSUSE', color: '#73ba25', ascii: `           .;ldkO0000Okdl;.
       .;d00xl:^''''''^:ok00d;.
     .d00l'                'o00d.
   .d0Kd'  Okxol:;,.          :O0d
  .OKKKK0kOKKKKKKKKKKOxo:,      lKO.
 ,0KKKKKKKKKKKKKKKK0P^,,,^dx:    ;00,
.OKKKKKKKKKKKKKKKKk'.oOPPb.'0k.   cKO.
:KKKKKKKKKKKKKKKKK: kKx..dd lKd   'OK:
dKKKKKKKKKKKOx0KKKd ^0KKKO' kKKc   dKd
dKKKKKKKKKKKK;.;oOKx,..^..;kKKK0.  dKd
:KKKKKKKKKKKK0o;...^cdxxOK0O/^^'  .0K:
 kKKKKKKKKKKKKKKK0x;,,......,;od  lKk
 '0KKKKKKKKKKKKKKKKKKKKK00KKOo^  c00'
  'kKKKOxddxkOO00000Okxoc;''   .dKk'
    l0Ko.                    .c00l'
     'l0Kk:.              .;xK0l'
        'lkK0xl:;,,,,;:ldO0kl'
            '^:ldxkkkkxdl:^'` },
  { id: 'alpine', name: 'Alpine Linux', color: '#0d597f', ascii: `       .hddddddddddddddddddddddh.
      :dddddddddddddddddddddddddd:
     /dddddddddddddddddddddddddddd/
    +dddddddddddddddddddddddddddddd+
  \`sdddddddddddddddddddddddddddddddds\`
 \`ydddddddddddd++hdddddddddddddddddddy\`
.hddddddddddd+\`  \`+ddddh:-sdddddddddddh.
hdddddddddd+\`      \`+y:    .sddddddddddh
ddddddddh+\`   \`//\`   \`.\`     -sddddddddd
ddddddh+\`   \`/hddh/\`   \`:s-    -sddddddd
ddddh+\`   \`/+/dddddh/\`   \`+s-    -sddddd
ddd+\`   \`/o\` :dddddddh/\`   \`oy-    .yddd
hdddyo+ohddyosdddddddddho+oydddy++ohdddh
.hddddddddddddddddddddddddddddddddddddh.
 \`yddddddddddddddddddddddddddddddddddy\`
  \`sdddddddddddddddddddddddddddddddds\`
    +dddddddddddddddddddddddddddddd+
     /dddddddddddddddddddddddddddd/
      :dddddddddddddddddddddddddd:
       .hddddddddddddddddddddddh.` },
  { id: 'gentoo', name: 'Gentoo', color: '#54487a', ascii: `         -/oyddmdhs+:.
     -odNMMMMMMMMNNmhy+-\`
   -yNMMMMMMMMMMMNNNmmdhy+-
 \`omMMMMMMMMMMMMNmdmmmmddhhy/\`
 omMMMMMMMMMMMNhhyyyohmdddhhhdo\`
.ydMMMMMMMMMMdhs++so/smdddhhhhdm+\`
 oyhdmNMMMMMMMNdyooydmddddhhhhyhNd.
  :oyhhdNNMMMMMMMNNNmmdddhhhhhyymMh
    .:+sydNMMMMMNNNmmmdddhhhhhhmMmy
       /mMMMMMMNNNmmmdddhhhhhmMNhs:
    \`oNMMMMMMMNNNmmmddddhhdmMNhs+\`
  \`sNMMMMMMMMNNNmmmdddddmNMmhs/.
 /NMMMMMMMMNNNNmmmdddmNMNdso:\`
+MMMMMMMNNNNNmmmmdmNMNdso/-
yMMNNNNNNNmmmmmNNMmhs+/-\`
/hMMNNNNNNNNMNdhs++/-\`
\`/ohdmmddhys+++/:.
  \`-//////:--.` },
  { id: 'manjaro', name: 'Manjaro', color: '#35bfa7', ascii: `██████████████████  ████████
██████████████████  ████████
██████████████████  ████████
██████████████████  ████████
████████            ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████` },
  { id: 'kali', name: 'Kali Linux', color: '#557c94', ascii: `..............
            ..,;:ccc,.
          ......''';lxO.
.....''''..........,:ld;
           .';;;:::;,,.x,
      ..'''.            0Xxoc:,.  ...
  ....                ,ONkc;,;cokOdc',.
 .                   OMo           ':ddo.
                    dMc               :OO;
                    0M.                 .:o.
                    ;Wd
                     ;XO,
                       ,d0Odlc;,..
                           ..',;:cdOOd::,.
                                    .:d;.':;.
                                       'd,  .'
                                         ;l   ..
                                          .o
                                            c
                                            .'
                                             .` },
  { id: 'void', name: 'Void Linux', color: '#478061', ascii: `                __.;=====;.__
            _.=+==++=++=+=+===;.
             -=+++=+===+=+=+++++=_
        .     -=:\`\`     \`--==+=++==.
       _vi,    \`            --+=++++:
      .uvnvi.       _._       -==+==+.
     .vvnvnI\`    .;==|==;.     :|=||=|.
+QmQQmpvvnv; _yYsyQQWUUQQQm #QmQ#:QQQWUV\$QQm.
 -QQWQWpvvowZ?.wQQQE==<QWWQ/QWQW.QQWW(: jQWQE
  -\$QQQQmmU'  jQQQ@+=<QWQQ)mQQQ.mQQQC+;jWQQ@'
   -\$WQ8YnI:   QWQQwgQQWV\`mWQQ.jQWQQgyyWW@!
     -1vvnvv.     \`~+++\`        ++|+++
      +vnvnnv,                 \`-|===
       +vnvnvns.           .      :=-
        -Invnvvnsi..___..=sv=.     \`
          +Invnvnvnnnnnnnnvvnn;.
            ~|Invnvnvvnvvvnnv}+\`
               -~|{*l}*|~` },
  { id: 'nixos', name: 'NixOS', color: '#5277c3', ascii: `          ▗▄▄▄       ▗▄▄▄▄    ▄▄▄▖
          ▜███▙       ▜███▙  ▟███▛
           ▜███▙       ▜███▙▟███▛
            ▜███▙       ▜██████▛
     ▟█████████████████▙ ▜████▛     ▟▙
    ▟███████████████████▙ ▜███▙    ▟██▙
           ▄▄▄▄▖           ▜███▙  ▟███▛
          ▟███▛             ▜██▛ ▟███▛
         ▟███▛               ▜▛ ▟███▛
▟███████████▛                  ▟██████████▙
▜██████████▛                  ▟███████████▛
      ▟███▛ ▟▙               ▟███▛
     ▟███▛ ▟██▙             ▟███▛
    ▟███▛  ▜███▙           ▝▀▀▀▀
    ▜██▛    ▜███▙ ▜██████████████████▛
     ▜▛     ▟████▙ ▜████████████████▛
           ▟██████▙         ▜███▙
          ▟███▛▜███▙         ▜███▙
         ▟███▛  ▜███▙         ▜███▙
         ▝▀▀▀    ▀▀▀▀▘         ▀▀▀▘` },
  { id: 'popos', name: 'Pop!_OS', color: '#48b9c7', ascii: `             /////////////
         /////////////////////
      ///////*767////////////////
    //////7676767676*//////////////
   /////76767//7676767//////////////
  /////767676///*76767///////////////
 ///////767676///76767.///7676*///////
/////////767676//76767///767676////////
//////////76767676767////76767/////////
///////////76767676//////7676//////////
////////////,7676,///////767///////////
/////////////*7676///////76////////////
///////////////7676////////////////////
 ///////////////7676///767////////////
  //////////////////////'////////////
   //////.7676767676767676767,//////
    /////767676767676767676767/////
      ///////////////////////////
         /////////////////////
             /////////////` }
];

const DISTROS_02 = [
  { id: 'elementary', name: 'elementary OS', color: '#64baff', ascii: `         eeeeeeeeeeeeeeeee
      eeeeeeeeeeeeeeeeeeeeeee
    eeeee  eeeeeeeeeeee   eeeee
  eeee   eeeee       eee     eeee
 eeee   eeee          eee     eeee
eee    eee            eee       eee
eee   eee            eee        eee
ee    eee           eeee       eeee
ee    eee         eeeee      eeeeee
ee    eee       eeeee      eeeee ee
eee   eeee   eeeeee      eeeee  eee
eee    eeeeeeeeee     eeeeee    eee
 eeeeeeeeeeeeeeeeeeeeeeee    eeeee
  eeeeeeee eeeeeeeeeeee      eeee
    eeeee                 eeeee
      eeeeeee         eeeeeee
         eeeeeeeeeeeeeeeee` },
  { id: 'cachyos', name: 'CachyOS', color: '#00aaff', ascii: `           .-------------------------:
          .+=========================.
         :++===++==================-       :++-
        :*++====+++++=============-        .==:
       -*+++=====+***++==========:
      =*++++========------------:
     =*+++++=====-                     ...
   .+*+++++=-===:                    .=+++=:
  :++++=====-==:                     -*****+
 :++========-=.                      .=+**+.
.+==========-.                          .
 :+++++++====-                                .--==-.
  :++==========.                             :+++++++:
   .-===========.                            =*****+*+
    .-===========:                           .+*****+:
      -=======++++:::::::::::::::::::::::::-:  .---:
       :======++++====+++******************=.
        :=====+++==========++++++++++++++*-
         .====++==============++++++++++*-
          .===+==================+++++++:
           .-=======================+++:
             ..........................` },
  { id: 'endeavouros', name: 'EndeavourOS', color: '#7f3fbf', ascii: `                     ./o.
                   ./sssso-
                 \`:osssssss+-
               \`:+sssssssssso/.
             \`-/ossssssssssssso/.
           \`-/+sssssssssssssssso+:\`
         \`-:/+sssssssssssssssssso+/.
       \`.://osssssssssssssssssssso++-
      .://+ssssssssssssssssssssssso++:
    .:///ossssssssssssssssssssssssso++:
  \`:////ssssssssssssssssssssssssssso+++.
\`-////+ssssssssssssssssssssssssssso++++-
 \`..-+oosssssssssssssssssssssssso+++++/\`
   ./++++++++++++++++++++++++++++++/:.
  \`:::::::::::::::::::::::::------\`\`` },
  { id: 'centos', name: 'CentOS Stream', color: '#932279', ascii: `                 ..
               .PLTJ.
              <><><><>
     KKSSV' 4KKK LJ KKKL.'VSSKK
     KKV' 4KKKKK LJ KKKKAL 'VKK
     V' ' 'VKKKK LJ KKKKV' ' 'V
     .4MA.' 'VKK LJ KKV' '.4Mb.
   . KKKKKA.' 'V LJ V' '.4KKKKK .
 .4D KKKKKKKA.'' LJ ''.4KKKKKKK FA.
<QDD ++++++++++++  ++++++++++++ GFD>
 'VD KKKKKKKK'.. LJ ..'KKKKKKKK FV
   ' VKKKKK'. .4 LJ K. .'KKKKKV '
      'VK'. .4KK LJ KKA. .'KV'
     A. . .4KKKK LJ KKKKA. . .4
     KKA. 'KKKKK LJ KKKKK' .4KK
     KKSSA. VKKK LJ KKKV .4SSKK
              <><><><>
               'MKKM'
                 ''` },
  { id: 'slackware', name: 'Slackware', color: '#8b0000', ascii: `                  :::::::::
            :::::::::::::::::::
         :::::::::::::::::::::::::
       ::::::::cllcccccllllllll::::::
    :::::::::lc               dc:::::::
   ::::::::cl   clllccllll    oc:::::::::
  :::::::::o   lc::::::::co   oc::::::::::
 ::::::::::o    cccclc:::::clcc::::::::::::
 :::::::::::lc        cclccclc:::::::::::::
::::::::::::::lcclcc          lc::::::::::::
::::::::::cclcc:::::lccclc     oc:::::::::::
::::::::::o    l::::::::::l    lc:::::::::::
 :::::cll:o     clcllcccll     o:::::::::::
 :::::occ:o                  clc:::::::::::
  ::::ocl:ccslclccclclccclclc:::::::::::::
   :::oclcccccccccccccllllllllllllll:::::
    ::lcc1lcccccccccccccccccccccccco::::
      ::::::::::::::::::::::::::::::::
        ::::::::::::::::::::::::::::
           ::::::::::::::::::::::
                ::::::::::::` },
  { id: 'parrot', name: 'Parrot OS', color: '#19b3ff', ascii: `  \`:oho/-\`
\`mMMMMMMMMMMMNmmdhy-
 dMMMMMMMMMMMMMMMMMMs\`
 +MMsohNMMMMMMMMMMMMMm/
 .My   .+dMMMMMMMMMMMMMh.
  +       :NMMMMMMMMMMMMNo
           \`yMMMMMMMMMMMMMm:
             /NMMMMMMMMMMMMMy\`
              .hMMMMMMMMMMMMMN+
                  \`\`-NMMMMMMMMMd-
                     /MMMMMMMMMMMs\`
                      mMMMMMMMsyNMN/
                      +MMMMMMMo  :sNh.
                      \`NMMMMMMm     -o/
                       oMMMMMMM.
                       \`NMMMMMM+
                        +MMd/NMh
                         mMm -mN\`
                         /MM  \`h:
                          dM\`   .
                          :M-
                           d:
                           -+
                            -` },
  { id: 'raspberry', name: 'Raspberry Pi OS', color: '#c51a4a', ascii: `         .~~.   .~~.
        '. \\ ' ' / .'
         .~ .~~~..~.
        : .~.''.~. :
        : :   :   : :
         '~. ' ' .~'
            '~~~'` },
  { id: 'proxmox', name: 'Proxmox VE', color: '#e57000', ascii: `██████╗ ██████╗  ██████╗ ██╗  ██╗███╗   ███╗ ██████╗ ██╗  ██╗
██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝████╗ ████║██╔═══██╗╚██╗██╔╝
██████╔╝██████╔╝██║   ██║ ╚███╔╝ ██╔████╔██║██║   ██║ ╚███╔╝ 
██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗ ██║╚██╔╝██║██║   ██║ ██╔██╗ 
██║     ██║  ██║╚██████╔╝██╔╝ ██╗██║ ✉ ██║╚██████╔╝██╔╝ ██╗
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝` },
  { id: 'truenas', name: 'TrueNAS SCALE', color: '#0095d5', ascii: `                      ++  ++
                  ++++++  ++++++
               +++++++++  +++++++++
               +++++++      +++++++
        +++  +++  +  --------  +  +++  +++
     ++++++  ++++++   ------   ++++++  ++++++
   ++++++++  ++++++++++    ++++++++++  ++++++++
  +++++++  --  +++++++      +++++++  --  +++++++
+++  +  --------  +  +++  +++  +  --------  +  +++
++++++  --------  ++++++  ++++++  --------  ++++++
++++++++++     +++++++++  +++++++++     ++++++++++
  +++++++++    +++++++  --  +++++++    +++++++++
      +++++  +++     --------     +++  +++++
         ++  +++++++  ------  +++++++  ++
             ++++++++++    ++++++++++
                ++++++++  ++++++++
                   +++++  +++++
                      ++  ++` },
  { id: 'android', name: 'Android', color: '#3ddc84', ascii: `         -o          o-
          +hydNNNNdyh+
        +mMMMMMMMMMMMMm+
      \`dMMm:NMMMMMMN:mMMd\`
      hMMMMMMMMMMMMMMMMMMh
  ..  yyyyyyyyyyyyyyyyyyyy  ..
.mMMm\`MMMMMMMMMMMMMMMMMMMM\`mMMm.
:MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:
:MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:
:MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:
:MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:
-MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM-
 +yy+ MMMMMMMMMMMMMMMMMMMM +yy+
      mMMMMMMMMMMMMMMMMMMm
      \`/++MMMMh++hMMMM++/\`
          MMMMo  oMMMM
          MMMMo  oMMMM
          oNMm-  -mMNs` },
  { id: 'macos', name: 'macOS', color: '#a2aaad', ascii: `                     ..'
                 ,xNMM.
               .OMMMMo
               lMM"
     .;loddo:.  .olloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  'XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       "cooc*"    "*coo'"` },
  { id: 'windows11', name: 'Windows 11', color: '#0078d4', ascii: `/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////

/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////
/////////////////  /////////////////` },
  { id: 'gnuhurd', name: 'GNU Hurd', color: '#8b0000', ascii: `    _-\`\`\`\`\`-,           ,- '- .
  .'   .- - |          | - -.  \`.
 /.'  /                     \`.   \\
:/   :      _...   ..._      \`\`   :
::   :     /._ .\`:'_.._\\.    ||   :
::    \`._ ./  ,\`  :    \\ . _.''   .
\`:.      /   |  -.  \\-. \\\\_      /
  \\:._ _/  .'   .@)  \\@) \` \`\\ ,.'
     _/,--'       .- .\\,-.\`--\`.
       ,'/''     (( \\ \`  )
        /'/'  \\    \`-'  (
         '/''  \`._,-----'
          ''/'    .,---'
           ''/'      ;:
             ''/''  ''/
               ''/''/''
                 '/'/'
                  \`;` }
];

const TUI_THEMES = [
  { id: 'green',      name: 'Phosphor Green', color: '#00ff66', bg: '#0a120b' },
  { id: 'amber',      name: 'Amber CRT',      color: '#ffb000', bg: '#140d04' },
  { id: 'cyan',       name: 'Cyber Cyan',     color: '#00f0ff', bg: '#051014' },
  { id: 'dracula',    name: 'Dracula Synth',  color: '#bd93f9', bg: '#110e1b' },
  { id: 'mono',       name: 'Monochrome',     color: '#eeeeee', bg: '#0f0f0f' },
  { id: 'cappuccino', name: 'Cappuccino',     color: '#e69a58', bg: '#1b1411' }
];

const SEASONS_SKINS = {
  christmas: {
    name: 'Navidad', emoji: '🎄', themeColor: '#0a0505',
    bootLines: [
      'meow@audio-box:~$ switch-skin christmas',
      '[ OK ] Cargando módulo 🎄 Seasons: Navidad...',
      '[ OK ] Aplicando paleta roja y verde',
      '[ OK ] Activando nieve cayendo',
      '[ OK ] Inicializando efectos navideños',
      'meow@audio-box:~$ ¡Feliz Navidad! Skin Navidad activo.'
    ]
  },
  halloween: {
    name: 'Halloween', emoji: '🎃', themeColor: '#0d0510',
    bootLines: [
      'meow@audio-box:~$ switch-skin halloween',
      '[ OK ] Cargando módulo 🎃 Seasons: Halloween...',
      '[ OK ] Aplicando paleta naranja y morado',
      '[ OK ] Liberando murciélagos',
      '[ OK ] Inicializando calabazas y telarañas',
      'meow@audio-box:~$ ¡Truco o trato! Skin Halloween activo.'
    ]
  },
  cyberpunk: {
    name: 'Cyberpunk', emoji: '🌆', themeColor: '#050014',
    bootLines: [
      'meow@audio-box:~$ switch-skin cyberpunk',
      '[ OK ] Cargando módulo 🌆 Seasons: Cyberpunk...',
      '[ OK ] Aplicando paleta magenta y cyan',
      '[ OK ] Generando grid synthwave',
      '[ OK ] Activando glitch effects',
      'meow@audio-box:~$ Welcome to Night City. Skin Cyberpunk activo.'
    ]
  },
  matrix: {
    name: 'Matrix', emoji: '🟢', themeColor: '#000000',
    bootLines: [
      'meow@audio-box:~$ switch-skin matrix',
      '[ OK ] Cargando módulo 🟢 Seasons: Matrix...',
      '[ OK ] Iniciando secuencia Matrix',
      '[ OK ] Lluvia de caracteres activa',
      '[ OK ] Conectando al mainframe',
      'meow@audio-box:~$ Wake up, Neo... Skin Matrix activo.'
    ]
  }
};

// ============================================================
// DOM — Referencias
// ============================================================
const bgBlur = document.getElementById('bgBlur');
const mainAudio = document.getElementById('mainAudioPlayer');
const secondaryAudio = document.getElementById('secondaryAudioPlayer');
const btnPlay = document.getElementById('btnPlay');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnShuffle = document.getElementById('btnShuffle');
const btnRepeat = document.getElementById('btnRepeat');
const btnFullscreen = document.getElementById('btnFullscreen');
const btnRotate = document.getElementById('btnRotate');
const btnCrt = document.getElementById('btnCrt');
const btnCerrarAviso = document.getElementById('btnCerrarAviso');

const coverEl = document.getElementById('cover');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const albumEl = document.getElementById('album');
const lufsBadge = document.getElementById('lufsBadge');
const audioSpecsEl = document.getElementById('audioSpecs');
const statusEl = document.getElementById('status');
const fileInput = document.getElementById('fileInput');
const folderInput = document.getElementById('folderInput');

const eqSelect = document.getElementById('eqSelect');
const dolbyToggle = document.getElementById('dolbyToggle');
const visualizerSelect = document.getElementById('visualizerSelect');
const paletteSelect = document.getElementById('paletteSelect');
const lufsSelect = document.getElementById('lufsSelect');

const crossfadeToggle = document.getElementById('crossfadeToggle');
const crossfadeTime = document.getElementById('crossfadeTime');
const crossfadeVal = document.getElementById('crossfadeVal');
const normalizationToggle = document.getElementById('normalizationToggle');
const normalizationStatus = document.getElementById('normalizationStatus');
const limiterToggle = document.getElementById('limiterToggle');
const boostAmount = document.getElementById('boostAmount');
const boostVal = document.getElementById('boostVal');

const skinSelect = document.getElementById('skinSelect');
const crtToggle = document.getElementById('crtToggle');
const visualizerSettingItem = document.getElementById('visualizerSettingItem');
const paletteSettingItem = document.getElementById('paletteSettingItem');

const trackInfoContainer = document.getElementById('trackInfoContainer');
const canvas = document.getElementById('visualizerCanvas');
const canvasCtx = canvas.getContext('2d');

const seekBar = document.getElementById('seekBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

const btnCloseQueue = document.getElementById('btnCloseQueue');
const playlistOverlay = document.getElementById('playlistOverlay');
const playlistContainer = document.getElementById('playlistContainer');
const playlistTitle = document.getElementById('playlistTitle');
const sortBar = document.getElementById('sortBar');

const playlistsOverlay = document.getElementById('playlistsOverlay');
const playlistsList = document.getElementById('playlistsList');
const btnClosePlaylists = document.getElementById('btnClosePlaylists');
const btnNewPlaylist = document.getElementById('btnNewPlaylist');

const playlistDetailOverlay = document.getElementById('playlistDetailOverlay');
const playlistDetailTitle = document.getElementById('playlistDetailTitle');
const playlistDetailList = document.getElementById('playlistDetailList');
const playlistDetailInfo = document.getElementById('playlistDetailInfo');
const btnBackToPlaylists = document.getElementById('btnBackToPlaylists');
const btnPlayPlaylist = document.getElementById('btnPlayPlaylist');
const btnPlaylistMenu = document.getElementById('btnPlaylistMenu');
const btnClosePlaylistDetail = document.getElementById('btnClosePlaylistDetail');
const btnAddCurrentToPlaylist = document.getElementById('btnAddCurrentToPlaylist');

const contextMenuOverlay = document.getElementById('contextMenuOverlay');
const contextMenu = document.getElementById('contextMenu');
const contextMenuTitle = document.getElementById('contextMenuTitle');
const contextMenuSubtitle = document.getElementById('contextMenuSubtitle');
const contextMenuList = document.getElementById('contextMenuList');
const btnCancelContextMenu = document.getElementById('btnCancelContextMenu');

const addToPlaylistOverlay = document.getElementById('addToPlaylistOverlay');
const addToPlaylistList = document.getElementById('addToPlaylistList');
const addToPlaylistSubtitle = document.getElementById('addToPlaylistSubtitle');
const btnCancelAddToPlaylist = document.getElementById('btnCancelAddToPlaylist');

const playlistModalOverlay = document.getElementById('playlistModalOverlay');
const playlistModalTitle = document.getElementById('playlistModalTitle');
const playlistNameInput = document.getElementById('playlistNameInput');
const btnCancelPlaylistModal = document.getElementById('btnCancelPlaylistModal');
const btnConfirmPlaylistModal = document.getElementById('btnConfirmPlaylistModal');

const confirmModalOverlay = document.getElementById('confirmModalOverlay');
const confirmModalTitle = document.getElementById('confirmModalTitle');
const confirmModalMessage = document.getElementById('confirmModalMessage');
const btnCancelConfirmModal = document.getElementById('btnCancelConfirmModal');
const btnConfirmConfirmModal = document.getElementById('btnConfirmConfirmModal');

const settingsOverlay = document.getElementById('settingsOverlay');
const btnCloseSettings = document.getElementById('btnCloseSettings');

const searchBoxContainer = document.getElementById('searchBoxContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

const navHome = document.getElementById('navHome');
const navQueue = document.getElementById('navQueue');
const navPlaylists = document.getElementById('navPlaylists');
const navSearch = document.getElementById('navSearch');
const navSettings = document.getElementById('navSettings');

const headerTitle = document.getElementById('headerTitle');
const avisoTitle = document.getElementById('avisoTitle');
const avisoText = document.getElementById('avisoText');
const versionTitle = document.getElementById('versionTitle');
const versionDesc = document.getElementById('versionDesc');
const metaThemeEl = document.getElementById('metaTheme');

const playerHeader = document.getElementById('playerHeader');
const tuiThemeList = document.getElementById('tuiThemeList');
const menuHeaderLabel = document.getElementById('menuHeaderLabel');

const distroBootOverlay = document.getElementById('distroBootOverlay');
const distroBootText = document.getElementById('distroBootText');

const dragDropOverlay = document.getElementById('dragDropOverlay');

// Theme Editor elements
const btnEditTuiTheme = document.getElementById('btnEditTuiTheme');
const themeEditorOverlay = document.getElementById('themeEditorOverlay');
const themePreview = document.getElementById('themePreview');
const themeNameInput = document.getElementById('themeNameInput');
const themeBgColor = document.getElementById('themeBgColor');
const themeTextColor = document.getElementById('themeTextColor');
const themeAccentColor = document.getElementById('themeAccentColor');
const themeAccent2Color = document.getElementById('themeAccent2Color');
const btnCancelThemeEditor = document.getElementById('btnCancelThemeEditor');
const btnDeleteTheme = document.getElementById('btnDeleteTheme');
const btnSaveTheme = document.getElementById('btnSaveTheme');

// ============================================================
// ESTADO GLOBAL
// ============================================================
let playlist = [];
let currentIndex = 0;
let currentObjectUrl = null;
let isUserSeeking = false;
let isShuffle = false;
let repeatMode = 'off';

let playlists = [];
let currentPlaylistId = null;
let contextMenuTargetIndex = -1;
let addToPlaylistTargetTrack = null;
let playlistModalMode = 'create';
let playlistModalEditId = null;
let confirmModalCallback = null;

let audioCtx = null;
let trackSource = null;
let analyser = null;
let eqFilters = [];
let dolbyFilter = null;
let dolbyGain = null;
let masterGain = null;
let keepAliveNode = null;
let limiterNode = null;
let boostGain = null;

let visualizerMode = 'off';
let selectedPalette = 'neon';
let lufsEnabled = false;
let animationFrameId = null;
let visualizerDataArray = null;

let userPausedManually = false;

let crossfadeEnabled = localStorage.getItem('meowCrossfadeEnabled') === 'true';
let crossfadeDuration = parseFloat(localStorage.getItem('meowCrossfadeDuration') || '3');
let normalizationEnabled = localStorage.getItem('meowNormalizationEnabled') === 'true';
let limiterEnabled = localStorage.getItem('meowLimiterEnabled') === 'true';
let boostDb = parseInt(localStorage.getItem('meowBoostDb') || '6', 10);

let isCrossfading = false;
let crossfadeTriggered = false;
let currentTrackNormalizationGain = 1.0;

let themeEditorCurrentId = null;

// ============================================================
// INDEXEDDB v3
// ============================================================
const DB_NAME = 'MeowAudioDB';
const DB_VERSION = 3;
const STORE_SONGS = 'songs';
const STORE_PLAYLISTS = 'playlists';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (db.objectStoreNames.contains(STORE_SONGS)) db.deleteObjectStore(STORE_SONGS);
      db.createObjectStore(STORE_SONGS, { keyPath: 'id', autoIncrement: true });
      if (db.objectStoreNames.contains(STORE_PLAYLISTS)) db.deleteObjectStore(STORE_PLAYLISTS);
      db.createObjectStore(STORE_PLAYLISTS, { keyPath: 'id', autoIncrement: true });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveTracksToDB(tracks) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_SONGS, 'readwrite');
    const store = tx.objectStore(STORE_SONGS);
    for (const track of tracks) {
      store.add({
        filename: track.filename, ext: track.ext,
        title: track.title, artist: track.artist, album: track.album,
        coverBase64: track.coverBase64 || null,
        specs: track.specs, fileBlob: track.file
      });
    }
  } catch (err) { console.warn("DB Save error:", err); }
}

async function savePlaylistsToDB() {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_PLAYLISTS, 'readwrite');
    const store = tx.objectStore(STORE_PLAYLISTS);
    store.clear();
    for (const pl of playlists) {
      const { id, ...rest } = pl;
      if (id !== undefined && id !== null && id !== 'fav') {
        store.put({ id, ...rest });
      } else {
        store.add(rest);
      }
    }
  } catch (err) { console.warn("DB Save playlists error:", err); }
}

async function loadStoredTracksFromDB() {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_SONGS, 'readonly');
    const store = tx.objectStore(STORE_SONGS);
    const request = store.getAll();
    request.onsuccess = () => {
      const stored = request.result || [];
      if (stored.length > 0) {
        playlist = stored.map(item => ({
          dbId: item.id, file: item.fileBlob, filename: item.filename, ext: item.ext,
          title: item.title, artist: item.artist, album: item.album,
          coverBase64: item.coverBase64,
          cover: item.coverBase64 || DEFAULT_COVER,
          specs: item.specs,
          isHiRes: /hi-res/i.test(item.specs || '')
        }));
        sortPlaylist();
        renderPlaylistUI();
        statusEl.textContent = "Biblioteca restaurada 🐾";
        setTimeout(() => { if (statusEl.textContent.includes("restaurada")) statusEl.textContent = ""; }, 3000);
      }
    };
  } catch (err) { console.warn("DB Load error:", err); }
}

async function loadStoredPlaylistsFromDB() {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_PLAYLISTS, 'readonly');
    const store = tx.objectStore(STORE_PLAYLISTS);
    const request = store.getAll();
    request.onsuccess = () => {
      const stored = request.result || [];
      playlists = stored.map(item => ({
        id: item.id,
        name: item.name,
        createdAt: item.createdAt || Date.now(),
        isFavorite: item.name === FAVORITES_PLAYLIST_NAME,
        tracks: item.tracks || []
      }));
      ensureFavoritesPlaylist();
      renderPlaylistsUI();
    };
  } catch (err) { console.warn("DB Load playlists error:", err); }
}

// ============================================================
// PLAYLISTS HELPERS
// ============================================================
function ensureFavoritesPlaylist() {
  let fav = playlists.find(p => p.name === FAVORITES_PLAYLIST_NAME || p.isFavorite);
  if (!fav) {
    fav = { id: 'fav', name: FAVORITES_PLAYLIST_NAME, createdAt: Date.now(), isFavorite: true, tracks: [] };
    playlists.unshift(fav);
  }
  return fav;
}

function getPlaylistById(id) {
  if (id === 'fav') return ensureFavoritesPlaylist();
  return playlists.find(p => p.id === id);
}

function getTrackKey(track) {
  return `${track.title}|${track.artist}|${track.filename}`;
}

function isTrackFavorite(track) {
  const fav = ensureFavoritesPlaylist();
  const key = getTrackKey(track);
  return fav.tracks.some(t => getTrackKey(t) === key);
}

function addTrackToFavorites(track) {
  const fav = ensureFavoritesPlaylist();
  const key = getTrackKey(track);
  if (!fav.tracks.some(t => getTrackKey(t) === key)) {
    fav.tracks.push({ title: track.title, artist: track.artist, album: track.album, filename: track.filename, ext: track.ext, specs: track.specs || '', coverBase64: track.coverBase64 || null, dbId: track.dbId || null });
    savePlaylistsToDB();
    return true;
  }
  return false;
}

function removeTrackFromFavorites(track) {
  const fav = ensureFavoritesPlaylist();
  const key = getTrackKey(track);
  const before = fav.tracks.length;
  fav.tracks = fav.tracks.filter(t => getTrackKey(t) !== key);
  if (fav.tracks.length !== before) { savePlaylistsToDB(); return true; }
  return false;
}

function toggleFavorite(track) {
  if (isTrackFavorite(track)) { removeTrackFromFavorites(track); return false; }
  else { addTrackToFavorites(track); return true; }
}

function addTrackToPlaylist(playlistId, track) {
  const pl = getPlaylistById(playlistId);
  if (!pl) return false;
  const key = getTrackKey(track);
  if (pl.tracks.some(t => getTrackKey(t) === key)) return false;
  pl.tracks.push({ title: track.title, artist: track.artist, album: track.album, filename: track.filename, ext: track.ext, specs: track.specs || '', coverBase64: track.coverBase64 || null, dbId: track.dbId || null });
  savePlaylistsToDB();
  return true;
}

// ============================================================
// COLA
// ============================================================
function enqueueNext(track) {
  const trackCopy = { ...track, dbId: track.dbId || null };
  const key = getTrackKey(track);
  const existingIdx = playlist.findIndex(t => getTrackKey(t) === key);
  if (existingIdx !== -1 && existingIdx !== currentIndex) {
    playlist.splice(existingIdx, 1);
    if (existingIdx < currentIndex) currentIndex--;
  }
  const insertAt = currentIndex + 1;
  playlist.splice(insertAt, 0, trackCopy);
  renderPlaylistUI();
  showToast('⏭ Añadido a continuación');
}

function enqueueEnd(track) {
  const trackCopy = { ...track, dbId: track.dbId || null };
  const key = getTrackKey(track);
  if (!playlist.some(t => getTrackKey(t) === key)) {
    playlist.push(trackCopy);
    renderPlaylistUI();
    showToast('📋 Añadido al final');
  } else {
    showToast('Ya está en la fila');
  }
}

function removeFromQueue(index) {
  if (index < 0 || index >= playlist.length) return;
  playlist.splice(index, 1);
  if (index < currentIndex) currentIndex--;
  else if (index === currentIndex) {
    if (playlist.length === 0) { mainAudio.pause(); mainAudio.removeAttribute('src'); currentIndex = 0; }
    else if (currentIndex >= playlist.length) currentIndex = playlist.length - 1;
  }
  renderPlaylistUI();
  showToast('❌ Eliminado de la fila');
}

// ============================================================
// TOAST
// ============================================================
let toastTimeout = null;
function showToast(message, duration = 1800) {
  let toast = document.getElementById('meowToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'meowToast';
    toast.className = 'meow-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('active');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('active'), duration);
}

// ============================================================
// WEB AUDIO
// ============================================================
const FREQUENCIES = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const EQ_PRESETS = {
  flat: [0,0,0,0,0,0,0,0,0,0], bassBoost: [7,6,4,2,0,0,0,0,0,0],
  electronic: [6,5,2,0,-2,2,1,3,5,6], hardstyle: [8,7,3,-1,-2,1,3,5,6,7],
  dance: [6,5,3,0,0,2,4,4,3,0], hiphop: [6,5,2,3,-1,-1,1,-1,2,4],
  rnb: [4,7,5,-1,-2,1,3,4,3,2], pop: [-2,1,3,4,5,4,2,0,-1,-2],
  rock: [5,4,3,1,-1,-1,1,3,4,5], classical: [4,3,2,2,-1,-1,0,2,3,4],
  acoustic: [3,2,1,1,2,2,3,3,2,1], vocal: [-3,-2,0,3,5,5,4,2,0,-2],
  pureAudio: [2,1,0,0,0,0,1,2,3,3]
};

function ensureKeepAlive() {
  if (!audioCtx || keepAliveNode) return;
  try {
    keepAliveNode = audioCtx.createConstantSource();
    keepAliveNode.offset.value = 0;
    keepAliveNode.connect(audioCtx.destination);
    keepAliveNode.start();
  } catch (e) {}
}

function initWebAudio() {
  if (!audioCtx) {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtxClass();
      trackSource = audioCtx.createMediaElementSource(mainAudio);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 1.0;

      eqFilters = FREQUENCIES.map((freq, i) => {
        const filter = audioCtx.createBiquadFilter();
        filter.type = (i === 0) ? 'lowshelf' : (i === FREQUENCIES.length - 1) ? 'highshelf' : 'peaking';
        if (filter.type === 'peaking') filter.Q.value = 1.4;
        filter.frequency.value = freq;
        filter.gain.value = 0;
        return filter;
      });

      dolbyFilter = audioCtx.createBiquadFilter();
      dolbyFilter.type = 'peaking';
      dolbyFilter.frequency.value = 3500;
      dolbyFilter.Q.value = 0.8;
      dolbyFilter.gain.value = 0;

      dolbyGain = audioCtx.createGain();
      dolbyGain.gain.value = 1.0;

      trackSource.connect(eqFilters[0]);
      for (let i = 0; i < eqFilters.length - 1; i++) eqFilters[i].connect(eqFilters[i + 1]);
      eqFilters[eqFilters.length - 1].connect(dolbyFilter);
      dolbyFilter.connect(dolbyGain);
      dolbyGain.connect(masterGain);
      masterGain.connect(analyser);
      analyser.connect(audioCtx.destination);

      visualizerDataArray = new Uint8Array(analyser.frequencyBinCount);
      ensureKeepAlive();
      applyLimiterState();

      audioCtx.onstatechange = () => {
        if (!mainAudio.paused && audioCtx.state !== 'running') audioCtx.resume().catch(() => {});
      };
    } catch (e) { console.warn("WebAudio init error:", e); }
  }
}

function updateAudioEffects() {
  initWebAudio();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  if (audioCtx && eqFilters.length > 0) {
    const gains = EQ_PRESETS[eqSelect.value] || EQ_PRESETS.flat;
    eqFilters.forEach((filter, index) => filter.gain.setTargetAtTime(gains[index], audioCtx.currentTime, 0.05));
    if (dolbyToggle.checked) {
      dolbyFilter.gain.setTargetAtTime(4.5, audioCtx.currentTime, 0.1);
      dolbyGain.gain.setTargetAtTime(1.15, audioCtx.currentTime, 0.1);
    } else {
      dolbyFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
      dolbyGain.gain.setTargetAtTime(1.0, audioCtx.currentTime, 0.1);
    }
  }
}

eqSelect.addEventListener('change', updateAudioEffects);
dolbyToggle.addEventListener('change', updateAudioEffects);

// ============================================================
// LIMITADOR
// ============================================================
function setupLimiter() {
  if (!audioCtx || limiterNode) return;
  try {
    limiterNode = audioCtx.createDynamicsCompressor();
    limiterNode.threshold.setValueAtTime(-3, audioCtx.currentTime);
    limiterNode.knee.setValueAtTime(0, audioCtx.currentTime);
    limiterNode.ratio.setValueAtTime(20, audioCtx.currentTime);
    limiterNode.attack.setValueAtTime(0.003, audioCtx.currentTime);
    limiterNode.release.setValueAtTime(0.1, audioCtx.currentTime);

    boostGain = audioCtx.createGain();
    boostGain.gain.value = Math.pow(10, boostDb / 20);

    if (masterGain && analyser) {
      try { masterGain.disconnect(); } catch (e) {}
      masterGain.connect(boostGain);
      boostGain.connect(limiterNode);
      limiterNode.connect(analyser);
    }
  } catch (e) { console.warn('Limiter error:', e); }
}

function updateBoost() {
  if (!boostGain || !audioCtx) return;
  boostGain.gain.setTargetAtTime(Math.pow(10, boostDb / 20), audioCtx.currentTime, 0.05);
}

function applyLimiterState() {
  if (!audioCtx) return;
  if (limiterEnabled) {
    setupLimiter();
    if (boostGain) updateBoost();
  } else {
    if (masterGain && analyser) {
      try {
        masterGain.disconnect();
        if (boostGain) try { boostGain.disconnect(); } catch (e) {}
        if (limiterNode) try { limiterNode.disconnect(); } catch (e) {}
        masterGain.connect(analyser);
      } catch (e) {}
    }
  }
}

// ============================================================
// NORMALIZACIÓN
// ============================================================
async function analyzeTrackLoudness(file) {
  try {
    const readSize = Math.min(file.size, 2 * 1024 * 1024);
    const buffer = await file.slice(0, readSize).arrayBuffer();
    const tempCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 48000 * 10, 48000);
    const audioBuffer = await tempCtx.decodeAudioData(buffer.slice(0));

    const channelData = audioBuffer.getChannelData(0);
    const sampleLength = Math.min(channelData.length, 48000 * 10);
    let sum = 0;
    for (let i = 0; i < sampleLength; i++) sum += channelData[i] * channelData[i];
    const rms = Math.sqrt(sum / sampleLength);
    const dbfs = 20 * Math.log10(rms);
    const lufs = dbfs - 0.691;
    const targetLufs = -14;
    const gainDb = targetLufs - lufs;
    const gainLinear = Math.pow(10, gainDb / 20);
    const clampedGain = Math.max(0.1, Math.min(10, gainLinear));
    return { lufs, gainDb, gainLinear: clampedGain };
  } catch (e) {
    console.warn('[Normalization] Error:', e);
    return { lufs: -14, gainDb: 0, gainLinear: 1.0 };
  }
}

async function applyNormalization(track) {
  if (!normalizationEnabled || !track || !track.file) return;
  normalizationStatus.textContent = '⏳ Analizando...';
  normalizationStatus.className = 'analyzing';
  try {
    const result = await analyzeTrackLoudness(track.file);
    currentTrackNormalizationGain = result.gainLinear;
    if (masterGain && audioCtx) masterGain.gain.setTargetAtTime(result.gainLinear, audioCtx.currentTime, 0.1);
    normalizationStatus.textContent = `✅ ${result.lufs.toFixed(1)} LUFS → Gain ${result.gainDb > 0 ? '+' : ''}${result.gainDb.toFixed(1)} dB`;
    normalizationStatus.className = 'ready';
  } catch (e) {
    normalizationStatus.textContent = '❌ Error de análisis';
    normalizationStatus.className = 'error';
    currentTrackNormalizationGain = 1.0;
  }
}

// ============================================================
// CROSSFADE
// ============================================================
function startCrossfade() {
  if (!crossfadeEnabled || isCrossfading) return;
  const nextIdx = getNextIndex();
  if (!playlist[nextIdx]) return;
  const nextTrack = playlist[nextIdx];
  if (!nextTrack || !nextTrack.file) return;

  isCrossfading = true;
  crossfadeTriggered = true;

  const duration = crossfadeDuration * 1000;
  const nextUrl = URL.createObjectURL(nextTrack.file);
  secondaryAudio.src = nextUrl;
  secondaryAudio.volume = 0;

  secondaryAudio.play().then(() => {
    const startTime = performance.now();
    const mainStartVolume = mainAudio.volume;

    function fadeStep() {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = progress * progress * (3 - 2 * progress);
      mainAudio.volume = mainStartVolume * (1 - eased);
      secondaryAudio.volume = eased;
      if (progress < 1) requestAnimationFrame(fadeStep);
      else completeCrossfade(nextIdx, nextUrl);
    }
    requestAnimationFrame(fadeStep);
  }).catch((e) => {
    console.warn('[Crossfade] Error:', e);
    isCrossfading = false;
    crossfadeTriggered = false;
  });
}

function completeCrossfade(nextIdx, nextUrl) {
  mainAudio.pause();
  mainAudio.removeAttribute('src');
  mainAudio.load();

  mainAudio.src = nextUrl;
  mainAudio.volume = 1;
  mainAudio.play().then(() => {
    secondaryAudio.pause();
    secondaryAudio.removeAttribute('src');
    secondaryAudio.load();

    currentIndex = nextIdx;
    isCrossfading = false;
    crossfadeTriggered = false;

    updateCurrentTrackUI(playlist[currentIndex]);

    const track = playlist[currentIndex];
    setupMediaSession(track.title, track.artist, track.album, track.cover);
    if (normalizationEnabled) applyNormalization(playlist[currentIndex]);

    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = nextUrl;
  }).catch((e) => {
    console.warn('[Crossfade] Transfer error:', e);
    isCrossfading = false;
    crossfadeTriggered = false;
  });
}

function updateCurrentTrackUI(track) {
  if (!track) return;
  titleEl.textContent = track.title;
  artistEl.textContent = track.artist;
  albumEl.textContent = track.album;
  coverEl.src = track.cover;
  if (track.isHiRes) audioSpecsEl.classList.add('has-hires');
  else audioSpecsEl.classList.remove('has-hires');
  audioSpecsEl.innerHTML = track.specs || `${track.ext.toUpperCase()} | 16 bit | 44.1 kHz`;
  if (track.cover && track.cover !== DEFAULT_COVER) bgBlur.style.backgroundImage = `url('${track.cover}')`;
}

// ============================================================
// HELPERS DE SKIN
// ============================================================
function getCurrentDistroList(skin) {
  if (skin === 'distro-01') return DISTROS_01;
  if (skin === 'distro-02') return DISTROS_02;
  return [];
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function isSeasonSkin(skin) {
  return ['christmas','halloween','cyberpunk','matrix'].includes(skin);
}

function isDistroSkin(skin) {
  return skin === 'distro-01' || skin === 'distro-02';
}

function getSeasonAccent(skin) {
  const accents = { christmas: '#ff2e2e', halloween: '#ff6f00', cyberpunk: '#ff00ff', matrix: '#00ff41' };
  return accents[skin] || '#ffffff';
}

function hexToRgba(hex, alpha) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(255, 255, 255, ${alpha})`;
  return `rgba(${parseInt(result[1],16)}, ${parseInt(result[2],16)}, ${parseInt(result[3],16)}, ${alpha})`;
}

// ============================================================
// OVERLAY ASCII
// ============================================================
function updateOverlayAscii(skin, distroId) {
  let ascii = '';
  let color = '';
  if (isDistroSkin(skin)) {
    const list = getCurrentDistroList(skin);
    const distro = list.find(d => d.id === distroId) || list[0];
    if (!distro) return;
    ascii = distro.ascii;
    color = distro.color;
  } else if (isSeasonSkin(skin)) {
    ascii = SEASONS_ASCII[skin] || '';
    color = getSeasonAccent(skin);
  } else {
    document.querySelectorAll('.overlay-ascii-content').forEach(el => el.textContent = '');
    return;
  }
  document.querySelectorAll('.overlay-ascii-content').forEach(el => {
    el.textContent = ascii;
    el.style.color = color;
    el.style.textShadow = `0 0 2px ${color}, 0 0 4px ${color}, 0 0 8px ${color}, 0 0 16px ${color}, 0 0 32px ${color}66, 0 0 48px ${color}33`;
  });
}

// ============================================================
// MENÚ TUI
// ============================================================
function loadCustomThemes() {
  try { return JSON.parse(localStorage.getItem('meowCustomTuiThemes') || '[]'); }
  catch (e) { return []; }
}

function saveCustomThemes(themes) {
  localStorage.setItem('meowCustomTuiThemes', JSON.stringify(themes));
}

function buildMenuItems(skin) {
  tuiThemeList.innerHTML = '';
  if (skin === 'tui') {
    menuHeaderLabel.textContent = 'meow@audio-box:~/themes';
    TUI_THEMES.forEach(t => {
      const li = document.createElement('li');
      li.className = 'tui-theme-item';
      li.dataset.theme = t.id;
      li.innerHTML = `<span class="tui-dot" style="background:${t.color}"></span> ${t.name} <span class="tui-check">✓</span>`;
      tuiThemeList.appendChild(li);
    });
    const customThemes = loadCustomThemes();
    if (customThemes.length > 0) {
      const sep = document.createElement('li');
      sep.style.cssText = 'border-top: 1px solid var(--accent); margin: 4px 10px; list-style: none; opacity: 0.5; padding: 0;';
      tuiThemeList.appendChild(sep);
      customThemes.forEach(t => {
        const li = document.createElement('li');
        li.className = 'tui-theme-item tui-theme-item-custom';
        li.dataset.theme = t.id;
        li.innerHTML = `<span class="tui-dot" style="background:${t.accent}"></span> ⭐ ${t.name} <span class="tui-check">✓</span>`;
        li.addEventListener('dblclick', (e) => { e.stopPropagation(); openThemeEditor(t.id); });
        li.addEventListener('contextmenu', (e) => { e.preventDefault(); e.stopPropagation(); openThemeEditor(t.id); });
        tuiThemeList.appendChild(li);
      });
    }
  } else if (isDistroSkin(skin)) {
    menuHeaderLabel.textContent = 'meow@audio-box:~/distros';
    const list = getCurrentDistroList(skin);
    list.forEach(d => {
      const li = document.createElement('li');
      li.className = 'tui-theme-item';
      li.dataset.distro = d.id;
      li.innerHTML = `<span class="tui-dot" style="background:${d.color}"></span> ${d.name} <span class="tui-check">✓</span>`;
      tuiThemeList.appendChild(li);
    });
  }
}

function markActiveMenuItem() {
  const isTui = document.body.classList.contains('skin-tui');
  const isDistro = document.body.classList.contains('skin-distro-01') || document.body.classList.contains('skin-distro-02');
  if (isTui) {
    const activeTheme = document.body.dataset.tuiTheme || 'green';
    document.querySelectorAll('.tui-theme-item').forEach(item => item.classList.toggle('active', item.dataset.theme === activeTheme));
  } else if (isDistro) {
    const activeDistro = document.body.dataset.distro || '';
    document.querySelectorAll('.tui-theme-item').forEach(item => item.classList.toggle('active', item.dataset.distro === activeDistro));
  }
}

// ============================================================
// TEMAS TUI
// ============================================================
function applyCustomTheme(themeId) {
  const customThemes = loadCustomThemes();
  const theme = customThemes.find(t => t.id === themeId);
  if (!theme) return;
  const root = document.documentElement;
  root.style.setProperty('--bg', theme.bg);
  root.style.setProperty('--bg-main', theme.bg);
  root.style.setProperty('--text', theme.text);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-cyan', theme.accent2);
  root.style.setProperty('--audio-spec-color', theme.accent2);
  root.style.setProperty('--glow-color', hexToRgba(theme.accent, 0.5));
  root.style.setProperty('--card-border', theme.accent);
  root.style.setProperty('--card-bg', theme.bg);
  root.style.setProperty('--text-muted', theme.accent2);
  document.body.dataset.tuiTheme = themeId;
  localStorage.setItem('meowTuiTheme', themeId);
  if (metaThemeEl) metaThemeEl.content = theme.bg;
  markActiveMenuItem();
  showToast(`🎨 Tema "${theme.name}" aplicado`);
  setTimeout(() => { if (visualizerMode !== 'off' || lufsEnabled) drawVisualizer(); }, 100);
}

function applyTuiTheme(themeKey) {
  if (themeKey && themeKey.startsWith('custom-')) { applyCustomTheme(themeKey); return; }
  const root = document.documentElement;
  ['--bg','--bg-main','--text','--accent','--accent-cyan','--audio-spec-color','--glow-color','--card-border','--card-bg','--text-muted'].forEach(p => root.style.removeProperty(p));
  const theme = TUI_THEMES.find(t => t.id === themeKey) || TUI_THEMES[0];
  document.body.dataset.tuiTheme = theme.id;
  localStorage.setItem('meowTuiTheme', theme.id);
  if (document.body.classList.contains('skin-tui')) metaThemeEl.content = theme.bg;
  markActiveMenuItem();
  setTimeout(() => { if (visualizerMode !== 'off' || lufsEnabled) drawVisualizer(); }, 80);
}

// ============================================================
// EDITOR DE TEMA
// ============================================================
function updateThemePreview() {
  if (!themePreview) return;
  const bg = themeBgColor.value;
  const text = themeTextColor.value;
  const accent = themeAccentColor.value;
  const accent2 = themeAccent2Color.value;
  themePreview.style.setProperty('--preview-bg', bg);
  themePreview.style.setProperty('--preview-text', text);
  themePreview.style.setProperty('--preview-accent', accent);
  themePreview.style.setProperty('--preview-accent2', accent2);
  themePreview.style.setProperty('--preview-glow', hexToRgba(accent, 0.5));
}

function openThemeEditor(themeId = null) {
  themeEditorCurrentId = themeId;
  if (themeId) {
    const customThemes = loadCustomThemes();
    const theme = customThemes.find(t => t.id === themeId);
    if (!theme) return;
    themeNameInput.value = theme.name;
    themeBgColor.value = theme.bg;
    themeTextColor.value = theme.text;
    themeAccentColor.value = theme.accent;
    themeAccent2Color.value = theme.accent2 || theme.accent;
    btnDeleteTheme.style.display = 'inline-flex';
    btnSaveTheme.textContent = '💾 Actualizar';
  } else {
    const activeTheme = document.body.dataset.tuiTheme || 'green';
    const theme = TUI_THEMES.find(t => t.id === activeTheme) || TUI_THEMES[0];
    themeNameInput.value = '';
    themeBgColor.value = theme.bg;
    themeTextColor.value = theme.color;
    themeAccentColor.value = theme.color;
    themeAccent2Color.value = theme.color;
    btnDeleteTheme.style.display = 'none';
    btnSaveTheme.textContent = '💾 Guardar';
  }
  updateThemePreview();
  themeEditorOverlay.classList.add('active');
  setTimeout(() => themeNameInput.focus(), 100);
}

function closeThemeEditor() {
  themeEditorOverlay.classList.remove('active');
  themeEditorCurrentId = null;
}

function saveThemeFromEditor() {
  const name = themeNameInput.value.trim();
  if (!name) {
    const box = themeEditorOverlay.querySelector('.modal-box');
    if (box) { box.classList.add('shake'); setTimeout(() => box.classList.remove('shake'), 400); }
    themeNameInput.focus();
    return;
  }
  const customThemes = loadCustomThemes();
  const themeData = { name, bg: themeBgColor.value, text: themeTextColor.value, accent: themeAccentColor.value, accent2: themeAccent2Color.value };
  if (themeEditorCurrentId) {
    const idx = customThemes.findIndex(t => t.id === themeEditorCurrentId);
    if (idx !== -1) { customThemes[idx] = { ...customThemes[idx], ...themeData }; showToast(`✏️ Tema "${name}" actualizado`); }
  } else {
    const newTheme = { id: 'custom-' + Date.now(), ...themeData, isCustom: true };
    customThemes.push(newTheme);
    themeEditorCurrentId = newTheme.id;
    showToast(`⭐ Tema "${name}" creado`);
  }
  saveCustomThemes(customThemes);
  if (document.body.classList.contains('skin-tui')) applyCustomTheme(themeEditorCurrentId);
  buildMenuItems('tui');
  markActiveMenuItem();
  closeThemeEditor();
}

function deleteCurrentTheme() {
  if (!themeEditorCurrentId) return;
  const customThemes = loadCustomThemes();
  const theme = customThemes.find(t => t.id === themeEditorCurrentId);
  if (!theme) return;
  openConfirmModal('Eliminar tema', `¿Eliminar el tema "${theme.name}"?`, () => {
    const newThemes = customThemes.filter(t => t.id !== themeEditorCurrentId);
    saveCustomThemes(newThemes);
    if (document.body.dataset.tuiTheme === themeEditorCurrentId) applyTuiTheme('green');
    buildMenuItems('tui');
    markActiveMenuItem();
    showToast('🗑️ Tema eliminado');
    closeThemeEditor();
  });
}

if (btnEditTuiTheme) btnEditTuiTheme.addEventListener('click', () => openThemeEditor(null));
if (btnCancelThemeEditor) btnCancelThemeEditor.addEventListener('click', closeThemeEditor);
if (btnSaveTheme) btnSaveTheme.addEventListener('click', saveThemeFromEditor);
if (btnDeleteTheme) btnDeleteTheme.addEventListener('click', deleteCurrentTheme);
if (themeEditorOverlay) themeEditorOverlay.addEventListener('click', (e) => { if (e.target === themeEditorOverlay) closeThemeEditor(); });
[themeBgColor, themeTextColor, themeAccentColor, themeAccent2Color].forEach(input => {
  if (input) input.addEventListener('input', updateThemePreview);
});
if (themeNameInput) themeNameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); saveThemeFromEditor(); } });

// ============================================================
// DISTROS
// ============================================================
function applyDistro(distroId) {
  const skin = localStorage.getItem('meowSkin') || 'classic';
  const list = getCurrentDistroList(skin);
  const distro = list.find(d => d.id === distroId) || list[0];
  if (!distro) return;
  document.body.dataset.distro = distro.id;
  localStorage.setItem('meowDistro', distro.id);
  updateOverlayAscii(skin, distro.id);
  if (isDistroSkin(skin)) metaThemeEl.content = '#0d1117';
  markActiveMenuItem();
  setTimeout(() => { if (visualizerMode !== 'off' || lufsEnabled) drawVisualizer(); }, 80);
}

// ============================================================
// VISUALIZADOR
// ============================================================
function applyVisualizerForClassic() {
  if (visualizerSettingItem) visualizerSettingItem.style.display = '';
  if (paletteSettingItem) paletteSettingItem.style.display = '';
  const savedMode = localStorage.getItem('meowVisualizerMode') || 'hybrid';
  const savedPalette = localStorage.getItem('meowPalette') || 'plasma';
  visualizerSelect.value = savedMode;
  paletteSelect.value = savedPalette;
  visualizerMode = savedMode;
  selectedPalette = savedPalette;
  canvas.style.display = (visualizerMode === 'off') ? 'none' : 'block';
  if (visualizerMode !== 'off') { initWebAudio(); drawVisualizer(); }
  else if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
}

function applyVisualizerForTui() {
  if (visualizerSettingItem) visualizerSettingItem.style.display = 'none';
  if (paletteSettingItem) paletteSettingItem.style.display = 'none';
  visualizerMode = 'off';
  visualizerSelect.value = 'off';
  canvas.style.display = 'none';
  if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

// ============================================================
// BOOT
// ============================================================
async function runBootAnimation(lines) {
  distroBootOverlay.classList.add('active');
  distroBootText.textContent = '';
  const delay = (ms) => new Promise(res => setTimeout(res, ms));
  for (const line of lines) {
    for (let i = 0; i < line.length; i++) { distroBootText.textContent += line[i]; await delay(10); }
    distroBootText.textContent += '\n';
    await delay(120);
  }
  await delay(500);
  distroBootOverlay.classList.remove('active');
  distroBootText.textContent = '';
}

async function playDistroBoot(skin, distroId) {
  const list = getCurrentDistroList(skin);
  const distro = list.find(d => d.id === distroId) || list[0];
  if (!distro) return;
  const skinName = skin === 'distro-01' ? '@distro_01' : '@distro_02';
  await runBootAnimation([
    `meow@audio-box:~$ switch-skin ${distro.id}`,
    `[ OK ] Cargando módulo ${skinName}...`,
    `[ OK ] Aplicando paleta ${distro.color}`,
    `[ OK ] Inicializando logo ASCII ${distro.name}`,
    `[ OK ] Montando fondos ASCII en overlays`,
    `meow@audio-box:~$ ¡Listo! Skin ${skinName} activo.`
  ]);
}

async function playSeasonBoot(skinKey) {
  const config = SEASONS_SKINS[skinKey];
  if (!config) return;
  await runBootAnimation(config.bootLines);
}

// ============================================================
// SKINS
// ============================================================
async function applySkin(skin, skipBoot = false) {
  const previousSkin = localStorage.getItem('meowSkin') || 'classic';
  const isEnteringDistro = isDistroSkin(skin) && previousSkin !== skin;
  const isEnteringSeason = isSeasonSkin(skin) && previousSkin !== skin;
  if (skin === 'distro-01' && previousSkin === 'distro-02') localStorage.setItem('meowDistro', 'arch');
  if (skin === 'distro-02' && previousSkin === 'distro-01') localStorage.setItem('meowDistro', 'elementary');

  if (isEnteringDistro && !skipBoot) await playDistroBoot(skin, localStorage.getItem('meowDistro') || (skin === 'distro-01' ? 'arch' : 'elementary'));
  else if (isEnteringSeason && !skipBoot) await playSeasonBoot(skin);

  document.body.classList.remove('skin-classic','skin-tui','skin-distro-01','skin-distro-02','skin-christmas','skin-halloween','skin-cyberpunk','skin-matrix');
  document.body.classList.add('skin-' + skin);
  localStorage.setItem('meowSkin', skin);
  if (skinSelect) skinSelect.value = skin;

  buildMenuItems(skin);

  if (skin === 'tui') {
    document.body.removeAttribute('data-distro');
    const savedTheme = localStorage.getItem('meowTuiTheme') || 'green';
    document.body.dataset.tuiTheme = savedTheme;
    headerTitle.textContent = '🎵 MEOW AUDIO APP';
    avisoTitle.textContent = '> SISTEMA DE PRIVACIDAD';
    avisoText.textContent = 'Todo el procesamiento de audio se realiza localmente. Ningún archivo o dato es enviado a servidores externos.';
    versionTitle.textContent = 'MEOW AUDIO APP // TUI v9.1';
    versionDesc.textContent = 'Haz clic en el header para cambiar de tema.';
    const theme = TUI_THEMES.find(t => t.id === savedTheme) || TUI_THEMES[0];
    if (!savedTheme.startsWith('custom-')) metaThemeEl.content = theme.bg;
    markActiveMenuItem();
    updateOverlayAscii('tui', null);
  } else if (isDistroSkin(skin)) {
    document.body.removeAttribute('data-tui-theme');
    const defaultDistro = skin === 'distro-01' ? 'arch' : 'elementary';
    const savedDistro = localStorage.getItem('meowDistro') || defaultDistro;
    document.body.dataset.distro = savedDistro;
    headerTitle.textContent = '🎵 MEOW AUDIO APP';
    avisoTitle.textContent = '> SISTEMA DE PRIVACIDAD';
    avisoText.textContent = 'Todo el procesamiento de audio se realiza localmente. Ningún archivo o dato es enviado a servidores externos.';
    versionTitle.textContent = `MEOW AUDIO APP // ${skin === 'distro-01' ? '@distro_01' : '@distro_02'} v9.1`;
    versionDesc.textContent = 'Haz clic en el header para cambiar de distro.';
    metaThemeEl.content = '#0d1117';
    updateOverlayAscii(skin, savedDistro);
    markActiveMenuItem();
  } else if (isSeasonSkin(skin)) {
    document.body.removeAttribute('data-tui-theme');
    document.body.removeAttribute('data-distro');
    const config = SEASONS_SKINS[skin];
    headerTitle.textContent = `${config.emoji} MEOW AUDIO APP`;
    avisoTitle.textContent = `> ${config.emoji} SISTEMA DE PRIVACIDAD`;
    avisoText.textContent = 'Todo el procesamiento de audio se realiza localmente. Ningún archivo o dato es enviado a servidores externos.';
    versionTitle.textContent = `MEOW AUDIO APP // ${config.name} v9.1`;
    versionDesc.textContent = `Skin temático activo. ¡${config.emoji}!`;
    metaThemeEl.content = config.themeColor;
    updateOverlayAscii(skin, null);
  } else {
    document.body.removeAttribute('data-tui-theme');
    document.body.removeAttribute('data-distro');
    headerTitle.textContent = '🐈 MEOW AUDIO APP 🐈';
    avisoTitle.textContent = '🐾 Aviso Gatuno 🐾';
    avisoText.textContent = 'Todo el procesamiento de audio se realiza de manera local en tu dispositivo. Ningún archivo o dato personal es subido a servidores externos. ¡Miau!';
    versionTitle.textContent = 'MEOW AUDIO APP v9.1';
    versionDesc.textContent = 'Skins: Classic, TUI, Distros, Seasons.';
    metaThemeEl.content = '#0f1015';
    updateOverlayAscii('classic', null);
  }

  playerHeader.classList.remove('menu-open');
  if (skin === 'classic') applyVisualizerForClassic();
  else applyVisualizerForTui();
  setTimeout(() => { if (visualizerMode !== 'off' || lufsEnabled) drawVisualizer(); }, 100);
}

if (skinSelect) skinSelect.addEventListener('change', () => applySkin(skinSelect.value));

function applyCrt(on) {
  document.body.classList.toggle('crt-off', !on);
  localStorage.setItem('meowCrt', String(on));
  if (crtToggle) crtToggle.checked = on;
}

if (crtToggle) crtToggle.addEventListener('change', () => applyCrt(crtToggle.checked));
if (btnCrt) btnCrt.addEventListener('click', () => {
  const isOn = !document.body.classList.contains('crt-off');
  applyCrt(!isOn);
  statusEl.textContent = isOn ? 'CRT desactivado' : 'CRT activado';
  setTimeout(() => { if (statusEl.textContent.includes('CRT')) statusEl.textContent = ''; }, 1500);
});

// ============================================================
// HEADER MENÚ
// ============================================================
if (playerHeader) {
  playerHeader.addEventListener('click', (e) => {
    const isTui = document.body.classList.contains('skin-tui');
    const isDistro = isDistroSkin(localStorage.getItem('meowSkin') || 'classic');
    if (!isTui && !isDistro) return;
    e.stopPropagation();
    const menu = document.getElementById('tuiThemeMenu');
    const willOpen = !playerHeader.classList.contains('menu-open');
    if (willOpen) {
      const headerRect = playerHeader.getBoundingClientRect();
      menu.style.top = (headerRect.bottom + 8) + 'px';
      playerHeader.classList.add('menu-open');
    } else playerHeader.classList.remove('menu-open');
  });
}

if (tuiThemeList) {
  tuiThemeList.addEventListener('click', (e) => {
    const item = e.target.closest('.tui-theme-item');
    if (!item) return;
    if (item.dataset.theme) applyTuiTheme(item.dataset.theme);
    else if (item.dataset.distro) applyDistro(item.dataset.distro);
    setTimeout(() => playerHeader.classList.remove('menu-open'), 200);
  });
}

document.addEventListener('click', (e) => {
  if (!playerHeader || !playerHeader.contains(e.target)) playerHeader?.classList.remove('menu-open');
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') playerHeader?.classList.remove('menu-open'); });

// ============================================================
// NAVEGACIÓN
// ============================================================
function closeAllOverlays() {
  playlistOverlay.classList.remove('active');
  playlistsOverlay.classList.remove('active');
  playlistDetailOverlay.classList.remove('active');
  settingsOverlay.classList.remove('active');
}

function setActiveTab(activeBtn) {
  [navHome, navQueue, navPlaylists, navSearch, navSettings].forEach(b => b.classList.remove('active'));
  activeBtn.classList.add('active');
}

if (navHome) navHome.addEventListener('click', () => { setActiveTab(navHome); closeAllOverlays(); });
if (navQueue) navQueue.addEventListener('click', () => {
  setActiveTab(navQueue); closeAllOverlays();
  playlistTitle.textContent = "Fila de reproducción";
  sortBar.style.display = 'flex';
  searchBoxContainer.classList.remove('active');
  searchInput.value = '';
  renderPlaylistUI();
  playlistOverlay.classList.add('active');
});
if (navPlaylists) navPlaylists.addEventListener('click', () => {
  setActiveTab(navPlaylists); closeAllOverlays();
  renderPlaylistsUI();
  playlistsOverlay.classList.add('active');
});
if (navSearch) navSearch.addEventListener('click', () => {
  setActiveTab(navSearch); closeAllOverlays();
  playlistTitle.textContent = "Búsqueda";
  sortBar.style.display = 'none';
  searchBoxContainer.classList.add('active');
  playlistOverlay.classList.add('active');
  searchInput.value = '';
  renderPlaylistUI();
  setTimeout(() => searchInput.focus(), 50);
});
if (navSettings) navSettings.addEventListener('click', () => {
  setActiveTab(navSettings); closeAllOverlays();
  settingsOverlay.classList.add('active');
});
if (btnCloseQueue) btnCloseQueue.addEventListener('click', () => { playlistOverlay.classList.remove('active'); setActiveTab(navHome); });
if (btnClosePlaylists) btnClosePlaylists.addEventListener('click', () => { playlistsOverlay.classList.remove('active'); setActiveTab(navHome); });
if (btnBackToPlaylists) btnBackToPlaylists.addEventListener('click', () => {
  playlistDetailOverlay.classList.remove('active');
  renderPlaylistsUI();
  playlistsOverlay.classList.add('active');
});
if (btnClosePlaylistDetail) btnClosePlaylistDetail.addEventListener('click', () => { playlistDetailOverlay.classList.remove('active'); setActiveTab(navHome); });
if (btnCloseSettings) btnCloseSettings.addEventListener('click', () => { settingsOverlay.classList.remove('active'); setActiveTab(navHome); });

// ============================================================
// BÚSQUEDA / ORDEN
// ============================================================
if (searchInput) searchInput.addEventListener('input', renderPlaylistUI);
if (sortSelect) sortSelect.addEventListener('change', () => { sortPlaylist(); renderPlaylistUI(); });

function sortPlaylist() {
  const criteria = sortSelect.value;
  if (criteria === 'default') return;
  const currentTrack = playlist[currentIndex];
  playlist.sort((a, b) => {
    let valA = (a[criteria] || a.filename || '').toString().toLowerCase();
    let valB = (b[criteria] || b.filename || '').toString().toLowerCase();
    return valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
  });
  if (currentTrack) currentIndex = playlist.findIndex(track => track === currentTrack);
}

function renderPlaylistUI() {
  playlistContainer.innerHTML = '';
  const isSearchTab = searchBoxContainer.classList.contains('active');
  const query = searchInput.value.toLowerCase().trim();
  if (isSearchTab && query.length === 0) {
    playlistContainer.innerHTML = `<li style="color:var(--text-muted); font-size:0.82rem; padding:20px 10px; text-align:center;">Escribe algo para buscar...</li>`;
    return;
  }
  const filtered = playlist.map((track, originalIndex) => ({ track, originalIndex })).filter(({ track }) => {
    if (!query) return true;
    return [track.title, track.artist, track.album, track.filename].some(x => (x || '').toLowerCase().includes(query));
  });
  if (filtered.length === 0) {
    playlistContainer.innerHTML = '<li style="color:var(--text-muted); font-size:0.82rem; padding:10px; text-align:center;">No se encontraron canciones</li>';
    return;
  }
  filtered.forEach(({ track, originalIndex }) => {
    const isFav = isTrackFavorite(track);
    const li = document.createElement('li');
    li.className = `playlist-item ${originalIndex === currentIndex ? 'playing' : ''}`;
    li.innerHTML = `
      <div style="flex:1;min-width:0;">
        <div class="playlist-item-title">${escapeHtml(track.title || track.filename)}</div>
        <div class="playlist-item-artist">${escapeHtml(track.artist)} ${track.album ? '• ' + escapeHtml(track.album) : ''}</div>
      </div>
      <div class="playlist-item-actions">
        ${isFav ? '<span class="playlist-item-fav">❤️</span>' : ''}
        <button class="playlist-item-more" data-index="${originalIndex}" title="Más opciones">⋯</button>
      </div>
    `;
    li.addEventListener('click', (e) => {
      if (e.target.closest('.playlist-item-more')) return;
      currentIndex = originalIndex;
      playTrack(currentIndex);
      closeAllOverlays();
      setActiveTab(navHome);
    });
    setupLongPress(li, () => openContextMenu(originalIndex));
    const moreBtn = li.querySelector('.playlist-item-more');
    if (moreBtn) moreBtn.addEventListener('click', (e) => { e.stopPropagation(); openContextMenu(originalIndex); });
    playlistContainer.appendChild(li);
  });
}

// ============================================================
// PLAYLISTS RENDER
// ============================================================
function renderPlaylistsUI() {
  playlistsList.innerHTML = '';
  const sorted = [...playlists].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return a.name.localeCompare(b.name);
  });
  if (sorted.length === 0) {
    playlistsList.innerHTML = `<li class="playlists-empty"><span class="playlists-empty-icon">📋</span>No tienes playlists todavía.<br>Toca "➕ Nueva" para crear una.</li>`;
    return;
  }
  sorted.forEach(pl => {
    const li = document.createElement('li');
    li.className = `playlists-item ${pl.isFavorite ? 'playlists-item-fav' : ''}`;
    li.innerHTML = `
      <span class="playlists-item-icon">${pl.isFavorite ? FAVORITES_ICON : '📋'}</span>
      <div class="playlists-item-info">
        <div class="playlists-item-name">${escapeHtml(pl.name)}</div>
        <div class="playlists-item-count">${pl.tracks.length} ${pl.tracks.length === 1 ? 'canción' : 'canciones'}</div>
      </div>
    `;
    li.addEventListener('click', () => openPlaylistDetail(pl.id));
    playlistsList.appendChild(li);
  });
}

function openPlaylistDetail(playlistId) {
  const pl = getPlaylistById(playlistId);
  if (!pl) return;
  currentPlaylistId = playlistId;
  playlistsOverlay.classList.remove('active');
  playlistDetailOverlay.classList.add('active');
  playlistDetailTitle.textContent = pl.name;
  renderPlaylistDetailUI();
}

function renderPlaylistDetailUI() {
  const pl = getPlaylistById(currentPlaylistId);
  if (!pl) return;
  playlistDetailInfo.textContent = `${pl.tracks.length} ${pl.tracks.length === 1 ? 'canción' : 'canciones'}`;
  playlistDetailList.innerHTML = '';
  if (pl.tracks.length === 0) {
    playlistDetailList.innerHTML = `<li class="playlists-empty"><span class="playlists-empty-icon">🎵</span>Esta playlist está vacía.<br>Añade canciones desde la fila o desde el menú ⋯.</li>`;
    btnPlayPlaylist.style.opacity = '0.4';
    btnPlayPlaylist.style.pointerEvents = 'none';
    return;
  }
  btnPlayPlaylist.style.opacity = '1';
  btnPlayPlaylist.style.pointerEvents = 'auto';
  pl.tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.className = 'playlist-item';
    li.innerHTML = `
      <div class="playlist-item-reorder">
        <button data-action="up" data-index="${index}" title="Subir">▲</button>
        <button data-action="down" data-index="${index}" title="Bajar">▼</button>
      </div>
      <div style="flex:1;min-width:0;padding-left:8px;">
        <div class="playlist-item-title">${escapeHtml(track.title || track.filename)}</div>
        <div class="playlist-item-artist">${escapeHtml(track.artist)} ${track.album ? '• ' + escapeHtml(track.album) : ''}</div>
      </div>
      <div class="playlist-item-actions">
        <button class="playlist-item-more" data-index="${index}" title="Opciones">⋯</button>
      </div>
    `;
    li.querySelectorAll('.playlist-item-reorder button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const idx = parseInt(btn.dataset.index, 10);
        moveTrackInPlaylist(currentPlaylistId, idx, action === 'up' ? -1 : 1);
      });
    });
    const moreBtn = li.querySelector('.playlist-item-more');
    moreBtn.addEventListener('click', (e) => { e.stopPropagation(); openTrackInPlaylistMenu(currentPlaylistId, index); });
    li.addEventListener('click', (e) => { if (!e.target.closest('button')) playFromPlaylist(currentPlaylistId, index); });
    playlistDetailList.appendChild(li);
  });
}

function moveTrackInPlaylist(playlistId, index, direction) {
  const pl = getPlaylistById(playlistId);
  if (!pl) return;
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= pl.tracks.length) return;
  [pl.tracks[index], pl.tracks[newIndex]] = [pl.tracks[newIndex], pl.tracks[index]];
  savePlaylistsToDB();
  renderPlaylistDetailUI();
}

function playFromPlaylist(playlistId, index) {
  const pl = getPlaylistById(playlistId);
  if (!pl || !pl.tracks.length) return;
  const newQueue = [];
  for (const stored of pl.tracks) {
    const real = playlist.find(t => t.title === stored.title && t.artist === stored.artist && t.filename === stored.filename);
    if (real) newQueue.push(real);
  }
  if (newQueue.length === 0) { showToast('Las canciones no están en la biblioteca'); return; }
  const start = pl.tracks[index];
  const startIdx = newQueue.findIndex(t => t.title === start.title && t.artist === start.artist && t.filename === start.filename);
  playlist = newQueue;
  currentIndex = startIdx >= 0 ? startIdx : 0;
  playTrack(currentIndex);
  closeAllOverlays();
  setActiveTab(navHome);
}

// ============================================================
// MENÚ CONTEXTUAL
// ============================================================
function openContextMenu(index) {
  const track = playlist[index];
  if (!track) return;
  contextMenuTargetIndex = index;
  contextMenuTitle.textContent = track.title || track.filename;
  contextMenuSubtitle.textContent = `${track.artist || 'Artista'}${track.album ? ' • ' + track.album : ''}`;
  const isFav = isTrackFavorite(track);
  contextMenuList.innerHTML = `
    <li class="bottom-sheet-item" data-action="play-now">▶ Reproducir ahora</li>
    <li class="bottom-sheet-item" data-action="enqueue-next">⏭ Añadir a continuación</li>
    <li class="bottom-sheet-item" data-action="enqueue-end">📋 Añadir al final de la fila</li>
    <li class="bottom-sheet-item" data-action="toggle-favorite">${isFav ? '💔 Quitar de Favoritas' : '❤️ Añadir a Favoritas'}</li>
    <li class="bottom-sheet-item" data-action="add-to-playlist">💾 Añadir a playlist...</li>
    <li class="bottom-sheet-item bottom-sheet-item-danger" data-action="remove-from-queue">❌ Quitar de la fila</li>
  `;
  contextMenuOverlay.classList.add('active');
}

if (contextMenuList) contextMenuList.addEventListener('click', (e) => {
  const item = e.target.closest('.bottom-sheet-item');
  if (!item) return;
  const action = item.dataset.action;
  const track = playlist[contextMenuTargetIndex];
  if (!track) return;
  contextMenuOverlay.classList.remove('active');
  setTimeout(() => {
    switch (action) {
      case 'play-now': currentIndex = contextMenuTargetIndex; playTrack(currentIndex); closeAllOverlays(); setActiveTab(navHome); break;
      case 'enqueue-next': enqueueNext(track); break;
      case 'enqueue-end': enqueueEnd(track); break;
      case 'toggle-favorite': { const was = isTrackFavorite(track); toggleFavorite(track); showToast(was ? '💔 Quitado' : '❤️ Añadido'); renderPlaylistUI(); break; }
      case 'add-to-playlist': openAddToPlaylist(track); break;
      case 'remove-from-queue': removeFromQueue(contextMenuTargetIndex); break;
    }
  }, 180);
});
if (btnCancelContextMenu) btnCancelContextMenu.addEventListener('click', () => contextMenuOverlay.classList.remove('active'));
if (contextMenuOverlay) contextMenuOverlay.addEventListener('click', (e) => { if (e.target === contextMenuOverlay) contextMenuOverlay.classList.remove('active'); });

function openTrackInPlaylistMenu(playlistId, index) {
  const pl = getPlaylistById(playlistId);
  if (!pl) return;
  const track = pl.tracks[index];
  if (!track) return;
  contextMenuTitle.textContent = track.title || track.filename;
  contextMenuSubtitle.textContent = `${track.artist || 'Artista'}${track.album ? ' • ' + track.album : ''}`;
  const isFav = isTrackFavorite(track);
  contextMenuList.innerHTML = `
    <li class="bottom-sheet-item" data-action="pl-play-now">▶ Reproducir ahora</li>
    <li class="bottom-sheet-item" data-action="pl-enqueue-next">⏭ Añadir a continuación</li>
    <li class="bottom-sheet-item" data-action="pl-enqueue-end">📋 Añadir al final de la fila</li>
    <li class="bottom-sheet-item" data-action="pl-toggle-favorite">${isFav ? '💔 Quitar de Favoritas' : '❤️ Añadir a Favoritas'}</li>
    <li class="bottom-sheet-item bottom-sheet-item-danger" data-action="pl-remove">❌ Quitar de esta playlist</li>
  `;
  contextMenuOverlay.classList.add('active');
  const handler = (e) => {
    const item = e.target.closest('.bottom-sheet-item');
    if (!item) return;
    const action = item.dataset.action;
    if (!action || !action.startsWith('pl-')) return;
    contextMenuOverlay.classList.remove('active');
    contextMenuList.removeEventListener('click', handler);
    setTimeout(() => {
      switch (action) {
        case 'pl-play-now': playFromPlaylist(playlistId, index); break;
        case 'pl-enqueue-next': { const real = playlist.find(t => t.title === track.title && t.artist === track.artist && t.filename === track.filename); if (real) enqueueNext(real); else showToast('No está en biblioteca'); break; }
        case 'pl-enqueue-end': { const real = playlist.find(t => t.title === track.title && t.artist === track.artist && t.filename === track.filename); if (real) enqueueEnd(real); else showToast('No está en biblioteca'); break; }
        case 'pl-toggle-favorite': { const was = isTrackFavorite(track); toggleFavorite(track); showToast(was ? '💔 Quitado' : '❤️ Añadido'); renderPlaylistDetailUI(); break; }
        case 'pl-remove': pl.tracks.splice(index, 1); savePlaylistsToDB(); renderPlaylistDetailUI(); showToast('❌ Quitado'); break;
      }
    }, 180);
  };
  contextMenuList.addEventListener('click', handler);
}

// ============================================================
// AÑADIR A PLAYLIST
// ============================================================
function openAddToPlaylist(track) {
  addToPlaylistTargetTrack = track;
  addToPlaylistSubtitle.textContent = track.title || track.filename;
  addToPlaylistList.innerHTML = '';
  const newLi = document.createElement('li');
  newLi.className = 'bottom-sheet-item';
  newLi.innerHTML = '➕ Crear nueva playlist';
  newLi.addEventListener('click', () => {
    addToPlaylistOverlay.classList.remove('active');
    openPlaylistModal('create', null, (newId) => { if (newId && addToPlaylistTargetTrack) { addTrackToPlaylist(newId, addToPlaylistTargetTrack); showToast('💾 Añadido'); } });
  });
  addToPlaylistList.appendChild(newLi);
  const sep = document.createElement('li');
  sep.style.cssText = 'border-top:1px solid rgba(255,255,255,0.1);margin:6px 20px;list-style:none;';
  addToPlaylistList.appendChild(sep);
  const sorted = [...playlists].sort((a,b) => (a.isFavorite && !b.isFavorite) ? -1 : (!a.isFavorite && b.isFavorite) ? 1 : a.name.localeCompare(b.name));
  sorted.forEach(pl => {
    const li = document.createElement('li');
    li.className = 'bottom-sheet-item';
    const alreadyIn = pl.tracks.some(t => getTrackKey(t) === getTrackKey(track));
    li.innerHTML = `${pl.isFavorite ? FAVORITES_ICON : '📋'} ${escapeHtml(pl.name)} ${alreadyIn ? '<span class="bottom-sheet-item-check">✓</span>' : ''}`;
    if (alreadyIn) li.classList.add('bottom-sheet-item-current');
    li.addEventListener('click', () => {
      addToPlaylistOverlay.classList.remove('active');
      if (alreadyIn) { showToast('Ya está'); return; }
      addTrackToPlaylist(pl.id, track);
      showToast(`💾 Añadido a "${pl.name}"`);
      renderPlaylistUI();
    });
    addToPlaylistList.appendChild(li);
  });
  addToPlaylistOverlay.classList.add('active');
}

if (btnCancelAddToPlaylist) btnCancelAddToPlaylist.addEventListener('click', () => addToPlaylistOverlay.classList.remove('active'));
if (addToPlaylistOverlay) addToPlaylistOverlay.addEventListener('click', (e) => { if (e.target === addToPlaylistOverlay) addToPlaylistOverlay.classList.remove('active'); });

// ============================================================
// MODALES
// ============================================================
function openPlaylistModal(mode = 'create', editId = null, onConfirm = null) {
  playlistModalMode = mode;
  playlistModalEditId = editId;
  confirmModalCallback = onConfirm;
  if (mode === 'edit') {
    const pl = getPlaylistById(editId);
    playlistModalTitle.textContent = 'Editar playlist';
    playlistNameInput.value = pl ? pl.name : '';
  } else {
    playlistModalTitle.textContent = 'Nueva playlist';
    playlistNameInput.value = '';
  }
  playlistModalOverlay.classList.add('active');
  setTimeout(() => playlistNameInput.focus(), 100);
}

if (btnCancelPlaylistModal) btnCancelPlaylistModal.addEventListener('click', () => { playlistModalOverlay.classList.remove('active'); confirmModalCallback = null; });
if (btnConfirmPlaylistModal) btnConfirmPlaylistModal.addEventListener('click', () => {
  const name = playlistNameInput.value.trim();
  if (!name) {
    const box = playlistModalOverlay.querySelector('.modal-box');
    if (box) { box.classList.add('shake'); setTimeout(() => box.classList.remove('shake'), 400); }
    return;
  }
  if (playlistModalMode === 'edit') {
    const pl = getPlaylistById(playlistModalEditId);
    if (pl) { pl.name = name; savePlaylistsToDB(); renderPlaylistsUI(); if (currentPlaylistId === playlistModalEditId) playlistDetailTitle.textContent = name; showToast('✏️ Actualizada'); }
  } else {
    const newPl = { name, createdAt: Date.now(), isFavorite: false, tracks: [] };
    playlists.push(newPl);
    savePlaylistsToDB().then(async () => {
      await loadStoredPlaylistsFromDB();
      renderPlaylistsUI();
      if (confirmModalCallback) { const created = playlists.find(p => p.name === name && !p.isFavorite); confirmModalCallback(created ? created.id : null); }
    });
  }
  playlistModalOverlay.classList.remove('active');
  playlistNameInput.value = '';
});
if (playlistNameInput) playlistNameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); btnConfirmPlaylistModal.click(); } });
if (btnNewPlaylist) btnNewPlaylist.addEventListener('click', () => openPlaylistModal('create'));

function openConfirmModal(title, message, onConfirm) {
  confirmModalTitle.textContent = title;
  confirmModalMessage.textContent = message;
  confirmModalCallback = onConfirm;
  confirmModalOverlay.classList.add('active');
}
if (btnCancelConfirmModal) btnCancelConfirmModal.addEventListener('click', () => { confirmModalOverlay.classList.remove('active'); confirmModalCallback = null; });
if (btnConfirmConfirmModal) btnConfirmConfirmModal.addEventListener('click', () => { if (confirmModalCallback) confirmModalCallback(); confirmModalOverlay.classList.remove('active'); confirmModalCallback = null; });

// MENÚ DE PLAYLIST
if (btnPlaylistMenu) btnPlaylistMenu.addEventListener('click', () => {
  const pl = getPlaylistById(currentPlaylistId);
  if (!pl) return;
  contextMenuTitle.textContent = pl.name;
  contextMenuSubtitle.textContent = `${pl.tracks.length} canciones`;
  const items = [];
  if (!pl.isFavorite) {
    items.push('<li class="bottom-sheet-item" data-action="plm-rename">✏️ Renombrar</li>');
    items.push('<li class="bottom-sheet-item" data-action="plm-export">💾 Exportar (.m3u8)</li>');
    items.push('<li class="bottom-sheet-item bottom-sheet-item-danger" data-action="plm-delete">🗑️ Borrar playlist</li>');
  } else {
    items.push('<li class="bottom-sheet-item" data-action="plm-export">💾 Exportar (.m3u8)</li>');
    items.push('<li class="bottom-sheet-item bottom-sheet-item-danger" data-action="plm-clear">🗑️ Vaciar Favoritas</li>');
  }
  contextMenuList.innerHTML = items.join('');
  contextMenuOverlay.classList.add('active');
  const handler = (e) => {
    const item = e.target.closest('.bottom-sheet-item');
    if (!item) return;
    const action = item.dataset.action;
    if (!action || !action.startsWith('plm-')) return;
    contextMenuOverlay.classList.remove('active');
    contextMenuList.removeEventListener('click', handler);
    setTimeout(() => {
      switch (action) {
        case 'plm-rename': openPlaylistModal('edit', currentPlaylistId); break;
        case 'plm-export': exportPlaylist(pl); break;
        case 'plm-delete':
          openConfirmModal('Borrar playlist', `¿Borrar "${pl.name}"?`, () => {
            playlists = playlists.filter(p => p.id !== currentPlaylistId);
            savePlaylistsToDB();
            playlistDetailOverlay.classList.remove('active');
            renderPlaylistsUI();
            playlistsOverlay.classList.add('active');
            showToast('🗑️ Borrada');
          });
          break;
        case 'plm-clear':
          openConfirmModal('Vaciar Favoritas', '¿Quitar todas las canciones?', () => {
            pl.tracks = [];
            savePlaylistsToDB();
            renderPlaylistDetailUI();
            showToast('🗑️ Vaciada');
          });
          break;
      }
    }, 180);
  };
  contextMenuList.addEventListener('click', handler);
});
if (btnPlayPlaylist) btnPlayPlaylist.addEventListener('click', () => { if (currentPlaylistId) playFromPlaylist(currentPlaylistId, 0); });
if (btnAddCurrentToPlaylist) btnAddCurrentToPlaylist.addEventListener('click', () => {
  if (!playlist[currentIndex]) { showToast('Sin canción actual'); return; }
  const added = addTrackToPlaylist(currentPlaylistId, playlist[currentIndex]);
  if (added) { showToast('💾 Añadido'); renderPlaylistDetailUI(); }
  else showToast('Ya está');
});

function exportPlaylist(pl) {
  if (!pl || pl.tracks.length === 0) { showToast('Playlist vacía'); return; }
  let content = `#EXTM3U\n#PLAYLIST:${pl.name}\n\n`;
  pl.tracks.forEach(t => content += `#EXTINF:-1,${t.artist} - ${t.title}\n${t.filename}.${t.ext}\n`);
  downloadFile(content, `${pl.name.replace(/[^a-zA-Z0-9]/g, '_')}.m3u8`, 'text/plain');
  showToast('💾 Exportada');
}

function setupLongPress(element, callback) {
  let pressTimer = null;
  const start = () => { pressTimer = setTimeout(() => { callback(); if (navigator.vibrate) navigator.vibrate(30); }, 500); };
  const cancel = () => { if (pressTimer) clearTimeout(pressTimer); pressTimer = null; };
  element.addEventListener('touchstart', start, { passive: true });
  element.addEventListener('touchend', cancel);
  element.addEventListener('touchmove', cancel);
  element.addEventListener('touchcancel', cancel);
  element.addEventListener('mousedown', start);
  element.addEventListener('mouseup', cancel);
  element.addEventListener('mouseleave', cancel);
}

// ============================================================
// CONFIGURACIONES
// ============================================================
if (crossfadeSliderInput()) {}

function crossfadeSliderInput() {
  // (placeholder para evitar errores si no existe)
  return false;
}

// Crossfade UI
if (crossfadeToggle) {
  crossfadeToggle.checked = crossfadeEnabled;
  crossfadeToggle.addEventListener('change', () => {
    crossfadeEnabled = crossfadeToggle.checked;
    localStorage.setItem('meowCrossfadeEnabled', String(crossfadeEnabled));
    showToast(crossfadeEnabled ? '🎚 Crossfade activado' : 'Desactivado');
    crossfadeTriggered = false;
  });
}
if (crossfadeTime) {
  crossfadeTime.value = crossfadeDuration;
  if (crossfadeVal) crossfadeVal.textContent = crossfadeDuration;
  crossfadeTime.addEventListener('input', () => {
    crossfadeDuration = parseFloat(crossfadeTime.value);
    if (crossfadeVal) crossfadeVal.textContent = crossfadeDuration;
    localStorage.setItem('meowCrossfadeDuration', String(crossfadeDuration));
  });
}

// Normalización UI
if (normalizationToggle) {
  normalizationToggle.checked = normalizationEnabled;
  normalizationToggle.addEventListener('change', () => {
    normalizationEnabled = normalizationToggle.checked;
    localStorage.setItem('meowNormalizationEnabled', String(normalizationEnabled));
    if (normalizationEnabled) {
      showToast('📊 Normalización activada');
      if (playlist[currentIndex]) applyNormalization(playlist[currentIndex]);
    } else {
      showToast('Desactivada');
      if (masterGain && audioCtx) masterGain.gain.setTargetAtTime(1.0, audioCtx.currentTime, 0.1);
      if (normalizationStatus) { normalizationStatus.textContent = 'Análisis: inactivo'; normalizationStatus.className = ''; }
    }
  });
}

// Limitador UI
if (limiterToggle) {
  limiterToggle.checked = limiterEnabled;
  limiterToggle.addEventListener('change', () => {
    limiterEnabled = limiterToggle.checked;
    localStorage.setItem('meowLimiterEnabled', String(limiterEnabled));
    applyLimiterState();
    showToast(limiterEnabled ? '🛡️ Limitador activado' : 'Desactivado');
  });
}
if (boostAmount) {
  boostAmount.value = boostDb;
  if (boostVal) boostVal.textContent = '+' + boostDb;
  boostAmount.addEventListener('input', () => {
    boostDb = parseInt(boostAmount.value, 10);
    if (boostVal) boostVal.textContent = '+' + boostDb;
    localStorage.setItem('meowBoostDb', String(boostDb));
    updateBoost();
  });
}

// Visualizer
if (visualizerSelect) visualizerSelect.addEventListener('change', () => {
  visualizerMode = visualizerSelect.value;
  localStorage.setItem('meowVisualizerMode', visualizerMode);
  canvas.style.display = (visualizerMode === 'off') ? 'none' : 'block';
  if (visualizerMode !== 'off') { initWebAudio(); drawVisualizer(); }
});
if (paletteSelect) paletteSelect.addEventListener('change', () => {
  selectedPalette = paletteSelect.value;
  localStorage.setItem('meowPalette', selectedPalette);
  if (visualizerMode !== 'off') drawVisualizer();
});
if (lufsSelect) lufsSelect.addEventListener('change', () => {
  lufsEnabled = (lufsSelect.value === 'on');
  lufsBadge.style.display = lufsEnabled ? 'block' : 'none';
  if (lufsEnabled) { initWebAudio(); drawVisualizer(); }
});
if (trackInfoContainer) trackInfoContainer.addEventListener('click', () => {
  if (document.body.classList.contains('skin-tui')) return;
  const modes = ['off','bars','scope','hybrid','spiral','particles','3d'];
  const nextIndex = (modes.indexOf(visualizerMode) + 1) % modes.length;
  visualizerMode = modes[nextIndex];
  visualizerSelect.value = visualizerMode;
  localStorage.setItem('meowVisualizerMode', visualizerMode);
  canvas.style.display = (visualizerMode === 'off') ? 'none' : 'block';
  if (visualizerMode !== 'off') { initWebAudio(); drawVisualizer(); }
});

// ============================================================
// REPRODUCCIÓN
// ============================================================
function playTrack(index) {
  if (!playlist[index]) return;
  const track = playlist[index];
  seekBar.value = 0;
  currentTimeEl.textContent = "00:00";
  durationEl.textContent = "00:00";
  updateCurrentTrackUI(track);
  renderPlaylistUI();
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  currentObjectUrl = URL.createObjectURL(track.file);
  mainAudio.src = currentObjectUrl;
  updateAudioEffects();
  setupMediaSession(track.title, track.artist, track.album, track.cover);
  userPausedManually = false;
  isCrossfading = false;
  crossfadeTriggered = false;
  mainAudio.play().then(() => {
    btnPlay.textContent = '⏸';
    updatePositionState();
    if (normalizationEnabled) setTimeout(() => applyNormalization(track), 500);
  }).catch(err => {
    console.warn("Reproducción en espera:", err);
    btnPlay.textContent = '▶';
  });
}

// Crossfade trigger
if (mainAudio) mainAudio.addEventListener('timeupdate', () => {
  if (!crossfadeEnabled || isCrossfading || crossfadeTriggered) return;
  if (!mainAudio.duration || mainAudio.duration < crossfadeDuration * 2) return;
  const remaining = mainAudio.duration - mainAudio.currentTime;
  if (remaining <= crossfadeDuration && remaining > 0) startCrossfade();
});

// ============================================================
// MEDIA SESSION
// ============================================================
function setupMediaSession(title, artist, album, cover) {
  if ('mediaSession' in navigator) {
    const artwork = (cover && cover !== DEFAULT_COVER) ? [{ src: cover, sizes: '512x512', type: 'image/png' }] : [];
    navigator.mediaSession.metadata = new MediaMetadata({ title: title || 'Canción', artist: artist || 'Artista', album: album || 'Biblioteca', artwork });
    navigator.mediaSession.setActionHandler('play', () => { userPausedManually = false; if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => {}); mainAudio.play(); btnPlay.textContent = '⏸'; });
    navigator.mediaSession.setActionHandler('pause', () => { userPausedManually = true; mainAudio.pause(); btnPlay.textContent = '▶'; });
    navigator.mediaSession.setActionHandler('previoustrack', playPrev);
    navigator.mediaSession.setActionHandler('nexttrack', playNext);
    try { navigator.mediaSession.setActionHandler('seekto', (d) => { if (d.seekTime !== undefined) { mainAudio.currentTime = d.seekTime; updatePositionState(); } }); } catch (e) {}
  }
}

function updatePositionState() {
  if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
    if (mainAudio.duration && !isNaN(mainAudio.duration)) {
      navigator.mediaSession.setPositionState({ duration: mainAudio.duration, playbackRate: mainAudio.playbackRate, position: mainAudio.currentTime });
    }
  }
}

// EVENTOS AUDIO
if (mainAudio) {
  mainAudio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(mainAudio.duration);
    updatePositionState();
  });
  mainAudio.addEventListener('timeupdate', () => {
    if (!isUserSeeking && mainAudio.duration) {
      seekBar.value = (mainAudio.currentTime / mainAudio.duration) * 100;
      currentTimeEl.textContent = formatTime(mainAudio.currentTime);
    }
  });
  mainAudio.addEventListener('ended', () => {
    if (repeatMode === 'one') { mainAudio.currentTime = 0; mainAudio.play().catch(console.warn); }
    else playNext();
  });
}

if (seekBar) {
  seekBar.addEventListener('input', () => {
    isUserSeeking = true;
    if (mainAudio.duration) currentTimeEl.textContent = formatTime((seekBar.value / 100) * mainAudio.duration);
  });
  seekBar.addEventListener('change', () => {
    if (mainAudio.duration) { mainAudio.currentTime = (seekBar.value / 100) * mainAudio.duration; updatePositionState(); }
    isUserSeeking = false;
  });
}

function togglePlay() {
  if (!mainAudio.src) return;
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  if (mainAudio.paused) { userPausedManually = false; mainAudio.play(); btnPlay.textContent = '⏸'; }
  else { userPausedManually = true; mainAudio.pause(); btnPlay.textContent = '▶'; }
}

function getNextIndex() {
  if (playlist.length === 0) return 0;
  if (playlist.length === 1) return 0;
  if (isShuffle) {
    let r;
    do { r = Math.floor(Math.random() * playlist.length); } while (r === currentIndex);
    return r;
  }
  return (currentIndex + 1) % playlist.length;
}

function playNext() {
  if (playlist.length === 0) return;
  if (currentIndex === playlist.length - 1 && repeatMode === 'off' && !isShuffle) { mainAudio.pause(); btnPlay.textContent = '▶'; return; }
  currentIndex = getNextIndex();
  playTrack(currentIndex);
}

function playPrev() {
  if (playlist.length === 0) return;
  if (mainAudio.currentTime > 3) { mainAudio.currentTime = 0; updatePositionState(); return; }
  currentIndex = isShuffle ? getNextIndex() : (currentIndex - 1 + playlist.length) % playlist.length;
  playTrack(currentIndex);
}

if (btnPlay) btnPlay.addEventListener('click', togglePlay);
if (btnNext) btnNext.addEventListener('click', playNext);
if (btnPrev) btnPrev.addEventListener('click', playPrev);
if (btnShuffle) btnShuffle.addEventListener('click', () => { isShuffle = !isShuffle; btnShuffle.classList.toggle('active', isShuffle); });
if (btnRepeat) btnRepeat.addEventListener('click', () => {
  if (repeatMode === 'off') { repeatMode = 'all'; btnRepeat.textContent = '🔁'; btnRepeat.classList.add('active'); }
  else if (repeatMode === 'all') { repeatMode = 'one'; btnRepeat.textContent = '🔂'; btnRepeat.classList.add('active'); }
  else { repeatMode = 'off'; btnRepeat.textContent = '🔁'; btnRepeat.classList.remove('active'); }
});

if (btnFullscreen) btnFullscreen.addEventListener('click', () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
  else if (document.exitFullscreen) document.exitFullscreen();
});

if (btnRotate) btnRotate.addEventListener('click', async () => {
  if (screen.orientation && screen.orientation.lock) {
    try {
      const current = screen.orientation.type;
      const target = current.startsWith('landscape') ? 'portrait-primary' : 'landscape-primary';
      await screen.orientation.lock(target);
      return;
    } catch (e) {}
  }
  document.body.classList.toggle('force-landscape');
  setTimeout(() => { if (visualizerMode !== 'off' || lufsEnabled) drawVisualizer(); }, 300);
});

window.addEventListener('orientationchange', () => document.body.classList.remove('force-landscape'));

// ============================================================
// ATAJOS
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
  switch (e.code) {
    case 'Space': e.preventDefault(); togglePlay(); break;
    case 'KeyN': playNext(); break;
    case 'KeyP': playPrev(); break;
    case 'KeyM': mainAudio.muted = !mainAudio.muted; break;
    case 'ArrowUp': e.preventDefault(); mainAudio.volume = Math.min(1, mainAudio.volume + 0.1); break;
    case 'ArrowDown': e.preventDefault(); mainAudio.volume = Math.max(0, mainAudio.volume - 0.1); break;
  }
});

// ============================================================
// VISUALIZADOR
// ============================================================
function getPaletteColors() {
  switch (selectedPalette) {
    case 'viridis': return ['#440154', '#21908d', '#fde725'];
    case 'plasma': return ['#0d0887', '#cc4678', '#f0f921'];
    case 'cividis': return ['#002051', '#7b7c7e', '#fcea1d'];
    default: return ['#00ffcc', '#ff4757', '#ffffff'];
  }
}

function drawVisualizer() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  function render() {
    if (visualizerMode === 'off' && !lufsEnabled) return;
    animationFrameId = requestAnimationFrame(render);
    if (!analyser) return;
    const width = canvas.width = trackInfoContainer.clientWidth;
    const height = canvas.height = trackInfoContainer.clientHeight;
    const bufferLength = analyser.frequencyBinCount;
    if (!visualizerDataArray || visualizerDataArray.length !== bufferLength) visualizerDataArray = new Uint8Array(bufferLength);
    const dataArray = visualizerDataArray;
    canvasCtx.clearRect(0, 0, width, height);
    const colors = getPaletteColors();

    if (visualizerMode === 'bars' || visualizerMode === 'hybrid') {
      analyser.getByteFrequencyData(dataArray);
      const barWidth = (width / bufferLength) * 2;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;
        const gradient = canvasCtx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, colors[0]); gradient.addColorStop(0.5, colors[1]); gradient.addColorStop(1, colors[2]);
        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
    }

    if (visualizerMode === 'scope' || visualizerMode === 'hybrid') {
      analyser.getByteTimeDomainData(dataArray);
      canvasCtx.lineWidth = 2; canvasCtx.strokeStyle = colors[0];
      canvasCtx.beginPath();
      const sliceWidth = width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * height / 2;
        if (i === 0) canvasCtx.moveTo(x, y); else canvasCtx.lineTo(x, y);
        x += sliceWidth;
      }
      canvasCtx.lineTo(width, height / 2);
      canvasCtx.stroke();
    }

    if (visualizerMode === 'spiral') {
      analyser.getByteFrequencyData(dataArray);
      const cx = width / 2, cy = height / 2;
      const maxR = Math.min(width, height) / 2 * 0.9;
      const angleStep = (Math.PI * 2) / bufferLength;
      canvasCtx.beginPath();
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 255;
        const r = maxR * v;
        const angle = i * angleStep;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) canvasCtx.moveTo(x, y); else canvasCtx.lineTo(x, y);
      }
      canvasCtx.closePath();
      canvasCtx.strokeStyle = colors[0]; canvasCtx.lineWidth = 2; canvasCtx.stroke();
      canvasCtx.fillStyle = colors[1] + '44'; canvasCtx.fill();
    }

    if (visualizerMode === 'particles') {
      analyser.getByteFrequencyData(dataArray);
      for (let i = 0; i < bufferLength; i += 2) {
        const v = dataArray[i] / 255;
        const x = (i / bufferLength) * width;
        const y = height / 2;
        canvasCtx.beginPath();
        canvasCtx.arc(x, y - v * height / 3, 1 + v * 3, 0, Math.PI * 2);
        canvasCtx.fillStyle = colors[i % 3];
        canvasCtx.fill();
      }
    }

    if (visualizerMode === '3d') {
      analyser.getByteFrequencyData(dataArray);
      const n = bufferLength / 2;
      const cx = width / 2;
      for (let i = 0; i < n; i++) {
        const v = dataArray[i] / 255;
        const barW = (width / n) * 0.8;
        const barH = v * height * 0.8;
        const x = (i / n) * width + (width / n) * 0.1;
        const perspective = 1 + (i / n) * 0.5;
        canvasCtx.fillStyle = colors[i % 3];
        canvasCtx.fillRect(x, height / 2 - barH / 2, barW, barH * perspective);
      }
    }

    if (lufsEnabled) {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0, peak = 0;
      for (let i = 0; i < bufferLength; i++) { sum += dataArray[i]; if (dataArray[i] > peak) peak = dataArray[i]; }
      const avg = sum / bufferLength;
      const approxLUFS = (-0.6 * (255 - avg)).toFixed(1);
      lufsBadge.textContent = `${approxLUFS} LUFS S`;
    }
  }
  render();
}

window.addEventListener('resize', () => { if (visualizerMode !== 'off' || lufsEnabled) drawVisualizer(); });
window.addEventListener('orientationchange', () => setTimeout(() => { if (visualizerMode !== 'off' || lufsEnabled) drawVisualizer(); }, 250));

// ============================================================
// BACKGROUND PLAYBACK
// ============================================================
function resumeEverything() {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  if (!userPausedManually && mainAudio.src) {
    if (mainAudio.paused && mainAudio.readyState >= 2 && !mainAudio.ended) mainAudio.play().catch(() => {});
  }
  if ('mediaSession' in navigator) { try { navigator.mediaSession.playbackState = mainAudio.paused ? 'paused' : 'playing'; } catch (e) {} }
}

if (mainAudio) mainAudio.addEventListener('play', () => { userPausedManually = false; ensureKeepAlive(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden) resumeEverything(); });
window.addEventListener('pageshow', resumeEverything);
window.addEventListener('focus', resumeEverything);
window.addEventListener('resume', resumeEverything);
document.addEventListener('resume', resumeEverything);

setInterval(() => { if (!document.hidden && audioCtx && audioCtx.state === 'suspended' && !mainAudio.paused) audioCtx.resume().catch(() => {}); }, 3000);
setInterval(() => {
  if (audioCtx && audioCtx.state === 'closed') {
    audioCtx = null; keepAliveNode = null; limiterNode = null; boostGain = null;
    initWebAudio();
    if (!mainAudio.paused && mainAudio.src) mainAudio.play().catch(() => {});
  }
}, 5000);

// ============================================================
// METADATOS / ARCHIVOS
// ============================================================
function createCoverBlobUrl(coverData) {
  if (!coverData) return DEFAULT_COVER;
  if (coverData.startsWith('data:')) {
    try {
      const parts = coverData.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const uInt8Array = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; ++i) uInt8Array[i] = raw.charCodeAt(i);
      const blob = new Blob([uInt8Array], { type: contentType });
      return URL.createObjectURL(blob);
    } catch (e) { return DEFAULT_COVER; }
  }
  return coverData;
}

function readMetadata(file) {
  return new Promise((resolve) => {
    if (!window.jsmediatags) { resolve(null); return; }
    try {
      window.jsmediatags.read(file, {
        onSuccess: function(tag) {
          const tags = tag.tags;
          let coverUrl = null, coverBase64 = null;
          if (tags.picture) {
            const { data, format } = tags.picture;
            let b = "";
            for (let i = 0; i < data.length; i++) b += String.fromCharCode(data[i]);
            coverBase64 = `data:${format};base64,${window.btoa(b)}`;
            coverUrl = createCoverBlobUrl(coverBase64);
          }
          resolve({ title: tags.title || null, artist: tags.artist || null, album: tags.album || null, cover: coverUrl, coverBase64 });
        },
        onError: function() { resolve(null); }
      });
    } catch (e) { resolve(null); }
  });
}

async function parseBinaryAudioSpecs(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  const buffer = await file.slice(0, 2048 * 1024).arrayBuffer();
  const uint8 = new Uint8Array(buffer);
  const view = new DataView(buffer);
  let sampleRate = null, bitDepth = null;
  if (ext === 'flac') {
    let pos = -1;
    for (let i = 0; i < uint8.length - 4; i++) { if (uint8[i] === 0x66 && uint8[i+1] === 0x4C && uint8[i+2] === 0x61 && uint8[i+3] === 0x43) { pos = i; break; } }
    if (pos !== -1 && buffer.byteLength >= pos + 22) {
      const s = pos + 8;
      sampleRate = (uint8[s+10] << 12) | (uint8[s+11] << 4) | (uint8[s+12] >> 4);
      const b = (((uint8[s+12] & 0x01) << 4) | (uint8[s+13] >> 4)) + 1;
      if (b > 1 && b <= 32) bitDepth = `${b} bit`;
    }
  } else if (ext === 'wav') {
    let pos = -1;
    for (let i = 0; i < uint8.length - 4; i++) { if (uint8[i] === 0x66 && uint8[i+1] === 0x6D && uint8[i+2] === 0x74 && uint8[i+3] === 0x20) { pos = i; break; } }
    if (pos !== -1 && buffer.byteLength >= pos + 16) {
      sampleRate = view.getUint32(pos + 12, true);
      const bits = view.getUint16(pos + 22, true);
      if (bits > 0) bitDepth = `${bits} bit`;
    }
  }
  if (!sampleRate) {
    try {
      const o = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 1, 48000);
      const d = await o.decodeAudioData(buffer.slice(0));
      if (d && d.sampleRate) sampleRate = d.sampleRate;
    } catch (e) {}
  }
  if (!sampleRate) sampleRate = 44100;
  if (!bitDepth) bitDepth = (ext === 'flac' || ext === 'wav') ? '24 bit' : '16 bit';
  const khz = (sampleRate / 1000).toFixed(sampleRate % 1000 === 0 ? 0 : 1);
  const fmt = ext.toUpperCase();
  const lossless = (ext === 'wav' || ext === 'flac');
  const bitsNum = parseInt(bitDepth);
  const hires = (lossless && sampleRate >= 48000 && bitsNum >= 24);
  const hiresHtml = hires ? `<img src="${HI_RES_SVG}" class="hires-icon" alt="Hi-Res">` : '';
  return { html: `${hiresHtml} <span>${fmt} | ${bitDepth} | ${khz} kHz</span>`, isHiRes: hires };
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === Infinity) return '00:00';
  return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
}

async function handleFiles(files) {
  if (files.length === 0) return;
  statusEl.textContent = 'Procesando...';
  try {
    const newTracks = await Promise.all(files.map(async (file) => {
      const ext = file.name.split('.').pop().toLowerCase();
      const filename = file.name.replace(/\.[^/.]+$/, '');
      const [meta, specs] = await Promise.all([readMetadata(file), parseBinaryAudioSpecs(file)]);
      return { file, filename, ext, title: meta?.title || filename, artist: meta?.artist || 'Biblioteca Local', album: meta?.album || '', cover: meta?.cover || DEFAULT_COVER, coverBase64: meta?.coverBase64 || null, specs: specs.html, isHiRes: specs.isHiRes };
    }));
    const first = (playlist.length === 0);
    playlist = [...playlist, ...newTracks];
    statusEl.textContent = '';
    saveTracksToDB(newTracks);
    sortPlaylist();
    renderPlaylistUI();
    showToast(`✅ ${newTracks.length} canciones añadidas`);
    if (first) { currentIndex = 0; playTrack(currentIndex); }
  } catch (err) { statusEl.textContent = 'Error al cargar'; }
}

if (fileInput) fileInput.addEventListener('change', (e) => handleFiles(Array.from(e.target.files || [])));
if (folderInput) folderInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files || []).filter(f => /\.(mp3|wav|ogg|flac|m4a|aac)$/i.test(f.name));
  handleFiles(files);
});

// ============================================================
// EXPORTACIÓN GENERAL
// ============================================================
const exportM3u8 = document.getElementById('exportM3u8');
if (exportM3u8) exportM3u8.addEventListener('click', () => {
  if (playlist.length === 0) return alert('Lista vacía');
  let c = '#EXTM3U\n';
  playlist.forEach(t => c += `#EXTINF:-1,${t.artist} - ${t.title}\n${t.filename}.${t.ext}\n`);
  downloadFile(c, 'playlist.m3u8', 'text/plain');
});
const exportJson = document.getElementById('exportJson');
if (exportJson) exportJson.addEventListener('click', () => {
  if (playlist.length === 0) return alert('Lista vacía');
  const data = playlist.map(t => ({ title: t.title, artist: t.artist, album: t.album, filename: t.filename, specs: t.specs }));
  downloadFile(JSON.stringify(data, null, 2), 'playlist.json', 'application/json');
});
const exportReport = document.getElementById('exportReport');
if (exportReport) exportReport.addEventListener('click', () => {
  if (playlist.length === 0) return alert('Lista vacía');
  let c = '--- MEOW AUDIO APP REPORT ---\n\n';
  playlist.forEach((t, i) => c += `[${i+1}] ${t.artist} - ${t.title}\nÁlbum: ${t.album}\nSpecs: ${t.specs.replace(/<[^>]*>?/gm,'')}\n\n`);
  downloadFile(c, 'reporte_meow.txt', 'text/plain');
});

function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// ============================================================
// DRAG & DROP
// ============================================================
let dragCounter = 0;
['dragenter', 'dragover'].forEach(evt => {
  document.addEventListener(evt, (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (evt === 'dragenter') {
      dragCounter++;
      if (dragCounter === 1) {
        dragDropOverlay.classList.add('active');
        document.body.classList.add('dragging-active');
      }
    }
  });
});
document.addEventListener('dragleave', (e) => {
  e.preventDefault();
  e.stopPropagation();
  dragCounter--;
  if (dragCounter <= 0) {
    dragCounter = 0;
    dragDropOverlay.classList.remove('active');
    document.body.classList.remove('dragging-active');
  }
});
document.addEventListener('drop', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  dragCounter = 0;
  dragDropOverlay.classList.remove('active');
  document.body.classList.remove('dragging-active');

  const items = e.dataTransfer.items;
  const files = [];

  if (items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry();
      if (item) {
        await traverseEntry(item, files);
      }
    }
  }

  if (files.length === 0 && e.dataTransfer.files) {
    files.push(...Array.from(e.dataTransfer.files));
  }

  const audioFiles = files.filter(f => /\.(mp3|wav|ogg|flac|m4a|aac)$/i.test(f.name));
  if (audioFiles.length > 0) handleFiles(audioFiles);
  else showToast('No se encontraron archivos de audio');
});

async function traverseEntry(entry, files) {
  if (entry.isFile) {
    await new Promise((resolve) => {
      entry.file((file) => { files.push(file); resolve(); }, () => resolve());
    });
  } else if (entry.isDirectory) {
    const reader = entry.createReader();
    let entries = [];
    const readAll = () => new Promise((resolve) => {
      reader.readEntries((results) => {
        if (results.length === 0) resolve();
        else { entries.push(...results); readAll().then(resolve); }
      }, () => resolve());
    });
    await readAll();
    for (const child of entries) await traverseEntry(child, files);
  }
}

// ============================================================
// GESTOR DE ARCHIVOS
// ============================================================
(function initStorageManager() {
  const btnClearCache = document.getElementById('btnClearCache');
  const btnToggleOffline = document.getElementById('btnToggleOffline');
  const btnRefreshSW = document.getElementById('btnRefreshSW');
  const btnStorageDetails = document.getElementById('btnStorageDetails');
  const storageUsedEl = document.getElementById('storageUsed');
  const swStatusEl = document.getElementById('swStatus');
  const offlineStatusEl = document.getElementById('offlineStatus');
  if (!btnClearCache) return;

  async function updateStorageInfo() {
    try {
      if (navigator.storage && navigator.storage.estimate) {
        const e = await navigator.storage.estimate();
        if (storageUsedEl) storageUsedEl.textContent = `${(e.usage/1024/1024).toFixed(2)} MB / ${(e.quota/1024/1024).toFixed(0)} MB`;
      }
    } catch (e) {}
  }
  async function updateSWStatus() {
    if (!('serviceWorker' in navigator)) { if (swStatusEl) swStatusEl.textContent = 'No soportado'; return; }
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      if (swStatusEl) swStatusEl.textContent = (reg && reg.active) ? 'Activo ✅' : 'Inactivo';
    } catch (e) {}
  }
  function updateOfflineStatus() {
    const off = localStorage.getItem('meowOfflineMode') === 'true';
    if (offlineStatusEl) offlineStatusEl.textContent = off ? 'Activado ✅' : 'Desactivado';
    if (btnToggleOffline) {
      btnToggleOffline.textContent = off ? '📴 Desactivar offline' : '📴 Activar offline';
      btnToggleOffline.classList.toggle('active', off);
    }
  }
  btnClearCache.addEventListener('click', () => {
    openConfirmModal('Borrar caché', '¿Borrar TODA la caché? Se eliminarán canciones y playlists.', async () => {
      try {
        const dbs = await indexedDB.databases();
        for (const db of dbs) if (db.name) indexedDB.deleteDatabase(db.name);
        if ('caches' in window) { const keys = await caches.keys(); await Promise.all(keys.map(k => caches.delete(k))); }
        setTimeout(() => location.reload(), 1200);
      } catch (e) {}
    });
  });
  btnToggleOffline.addEventListener('click', async () => {
    const off = localStorage.getItem('meowOfflineMode') === 'true';
    if (!off) {
      try {
        const cache = await caches.open('meow-offline-v1');
        const urls = ['./','./index.html','./styles.css','./app.js','./manifest.json','https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js','https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Share+Tech+Mono&display=swap'];
        await Promise.all(urls.map(u => cache.add(u).catch(() => {})));
        localStorage.setItem('meowOfflineMode', 'true');
        updateOfflineStatus();
        showToast('✅ Modo offline activado');
      } catch (e) {}
    } else {
      localStorage.setItem('meowOfflineMode', 'false');
      updateOfflineStatus();
      showToast('Offline desactivado');
    }
  });
  btnRefreshSW.addEventListener('click', async () => {
    if (!('serviceWorker' in navigator)) return;
    try { const reg = await navigator.serviceWorker.getRegistration(); if (reg) { await reg.update(); setTimeout(() => location.reload(), 1000); } } catch (e) {}
  });
  btnStorageDetails.addEventListener('click', async () => {
    let m = '📊 DETALLES\n\n';
    try {
      const dbs = await indexedDB.databases();
      m += '🗄️ IndexedDB:\n';
      dbs.forEach(db => m += `  • ${db.name} v${db.version}\n`);
      if ('caches' in window) {
        const cachesNames = await caches.keys();
        m += '\n📦 Cache:\n';
        for (const name of cachesNames) { const c = await caches.open(name); const k = await c.keys(); m += `  • ${name} (${k.length})\n`; }
      }
      m += `\n📋 Playlists: ${playlists.length}\n🎵 Canciones: ${playlist.length}\n`;
      if (navigator.storage && navigator.storage.estimate) { const e = await navigator.storage.estimate(); m += `\n📏 Usado: ${(e.usage/1024/1024).toFixed(2)} MB`; }
    } catch (e) { m += '\n❌ ' + e.message; }
    alert(m);
  });
  updateStorageInfo(); updateSWStatus(); updateOfflineStatus();
  setInterval(updateStorageInfo, 5000);
})();

// ============================================================
// AVISO
// ============================================================
if (btnCerrarAviso) btnCerrarAviso.addEventListener('click', () => {
  const cb = document.getElementById('meow-check-no-mostrar');
  if (cb && cb.checked) localStorage.setItem('meowOcultarAviso', 'true');
  const aviso = document.getElementById('meow-aviso-privacidad');
  if (aviso) aviso.style.display = 'none';
});
if (localStorage.getItem('meowOcultarAviso') === 'true') {
  const aviso = document.getElementById('meow-aviso-privacidad');
  if (aviso) aviso.style.display = 'none';
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
async function initialize() {
  await loadStoredPlaylistsFromDB();
  const savedSkin = localStorage.getItem('meowSkin') || 'classic';
  await applySkin(savedSkin, true);
  if (!localStorage.getItem('meowVisualizerMode')) localStorage.setItem('meowVisualizerMode', 'hybrid');
  if (!localStorage.getItem('meowPalette')) localStorage.setItem('meowPalette', 'plasma');
  if (visualizerSelect) visualizerSelect.value = localStorage.getItem('meowVisualizerMode');
  if (paletteSelect) paletteSelect.value = localStorage.getItem('meowPalette');
  visualizerMode = visualizerSelect?.value || 'hybrid';
  selectedPalette = paletteSelect?.value || 'plasma';
  const savedTuiTheme = localStorage.getItem('meowTuiTheme') || 'green';
  applyTuiTheme(savedTuiTheme);
  const savedDistro = localStorage.getItem('meowDistro') || 'arch';
  applyDistro(savedDistro);
  const savedCrt = localStorage.getItem('meowCrt');
  applyCrt(savedCrt !== 'false');
  loadStoredTracksFromDB();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
else initialize();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => {});