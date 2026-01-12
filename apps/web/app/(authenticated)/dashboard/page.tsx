"use client"
import { SectionContents } from "../../../components/dashboard/contents";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <SectionContents view="all" />
    </div>
  );
}


// "use client"
// import { AppSidebar } from "../../../components/app-sidebar";
// import { SidebarInset, SidebarProvider, SidebarTrigger } from "@linktree/ui/sidebar";
// import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@linktree/ui/input-group";
// import { Button } from "@linktree/ui/button";
// import { ThemeSwitch } from "../../../components/theme-switch";
// import { mobileThemes, MobileThemeKey } from "../../../lib/mobile-themes";
// import { JSX, useState } from "react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@linktree/ui/select";
// import { Trash2, Star, Image, Share2, Lock, BarChart2 } from "lucide-react";

// interface LinkItem {
//   id: number;
//   title: string;
//   url: string;
//   clicks: number;
//   enabled: boolean;
//   icon?: JSX.Element;
// }

// // ------------------- MOBILE PREVIEW -------------------
// function MobilePreview({ theme, links }: { theme: MobileThemeKey; links: LinkItem[] }) {
//   const t = mobileThemes[theme];

//   return (
//     <div className="flex justify-center">
//       <div className="relative w-[380px] h-[720px] rounded-[3rem] bg-zinc-900 dark:bg-muted-foreground p-3 shadow-2xl">
//         <div className={`relative h-full w-full rounded-[2.5rem] overflow-hidden ${t.screen}`}>
          
//           {/* Notch */}
//           <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 w-36 rounded-full bg-black/80 dark:bg-muted-foreground z-20" />

//           <div className="relative h-full overflow-y-auto px-5 pt-14 pb-6">

//             {/* Avatar */}
//             <div className="flex justify-center">
//               <div className="h-24 w-24 rounded-full bg-muted dark:bg-muted-foreground border-4" />
//             </div>

//             <h2 className={`mt-4 text-center text-xl font-bold ${t.text}`}>
//               @sandip
//             </h2>

//             <p className={`mt-1 text-center text-sm ${t.muted}`}>
//               Full-stack developer • Open-source
//             </p>

//             {/* LINKS */}
//             <div className="mt-6 space-y-4">
//               {links.filter(link => link.enabled).map(link => (
//                 <a
//                   key={link.id}
//                   href={link.url || "#"}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`block rounded-xl px-4 py-3 text-center font-medium ${t.card} ${t.text} hover:opacity-80 transition`}
//                 >
//                   {link.icon && <span className="mr-2 inline-block align-middle">{link.icon}</span>}
//                   {link.title || "Untitled"}
//                 </a>
//               ))}
//             </div>

//             <div className="mt-8 flex justify-center">
//               <span className={`text-xs ${t.muted}`}>
//                 linktr.ee/@sandip
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// // ------------------- LINKS PANEL -------------------
// function LinksPanel({ links, setLinks }: { links: LinkItem[]; setLinks: React.Dispatch<React.SetStateAction<LinkItem[]>> }) {
//   const addLink = () => {
//     setLinks(prev => [
//       ...prev,
//       { id: Date.now(), title: "", url: "", clicks: 0, enabled: true, icon: <Image className="w-5 h-5 text-gray-400" /> },
//     ]);
//   };

//   const toggleLink = (id: number) => {
//     setLinks(prev => prev.map(link => link.id === id ? { ...link, enabled: !link.enabled } : link));
//   };

//   const deleteLink = (id: number) => {
//     setLinks(prev => prev.filter(link => link.id !== id));
//   };

//   return (
//     <div className="space-y-4">
//       <Button size={"lg"} className="w-full font-semibold rounded-full text-md" onClick={addLink}>
//         + Add
//       </Button>

//       {links.map(link => (
//         <div
//           key={link.id}
//           className={`flex items-center justify-between rounded-xl border-3 p-4 hover:shadow-lg transition-shadow duration-200 ${
//             link.enabled ? "border-secondary bg-card" : "border"
//           }`}
//         >
//           <div className="flex items-start gap-3">
//             <span className="mt-1">{link.icon}</span>
//             <div className="flex flex-col">
//               <input
//                 className="text-sm font-medium outline-none bg-transparent"
//                 placeholder="Title"
//                 value={link.title}
//                 onChange={e =>
//                   setLinks(prev =>
//                     prev.map(l => (l.id === link.id ? { ...l, title: e.target.value } : l))
//                   )
//                 }
//               />
//               <input
//                 className="text-xs text-gray-400 outline-none bg-transparent"
//                 placeholder="URL"
//                 value={link.url}
//                 onChange={e =>
//                   setLinks(prev =>
//                     prev.map(l => (l.id === link.id ? { ...l, url: e.target.value } : l))
//                   )
//                 }
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             {/* Action icons */}
//             <div className="flex items-center gap-2 text-sm">
//               <Share2 className="w-4 h-4 cursor-pointer text-muted-foreground" />
//               <Image className="w-4 h-4 cursor-pointer text-muted-foreground" />
//               <Star className="w-4 h-4 cursor-pointer text-muted-foreground" />
//               <Lock className="w-4 h-4 cursor-pointer text-muted-foreground" />
//               <BarChart2 className="w-4 h-4 cursor-pointer text-muted-foreground" />
//               <span>{link.clicks} clicks</span>
//             </div>

//             {/* Toggle */}
//             <button
//               onClick={() => toggleLink(link.id)}
//               className={`w-10 h-5 rounded-full transition-all duration-300 ${
//                 link.enabled ? "bg-primary" : "bg-gray-300"
//               }`}
//             >
//               <span
//                 className={`block w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${
//                   link.enabled ? "translate-x-5" : "translate-x-0"
//                 }`}
//               ></span>
//             </button>

//             {/* Delete */}
//             <button onClick={() => deleteLink(link.id)}>
//               <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ------------------- MAIN PAGE -------------------
// export default function Page() {
//   const [theme, setTheme] = useState<MobileThemeKey>("classic");
//   const [links, setLinks] = useState<LinkItem[]>([
//     { id: 1, title: "Portfolio", url: "https://portfolio.com", clicks: 1, enabled: true, icon: <Image className="w-5 h-5 text-purple-500" /> },
//     { id: 2, title: "Instagram", url: "", clicks: 0, enabled: false, icon: <Star className="w-5 h-5 text-pink-500" /> },
//   ]);

//   return (
//     <SidebarProvider>
//       <AppSidebar />

//       <SidebarInset>
//         {/* HEADER */}
//         <header className="flex h-16 shrink-0 items-start flex-col md:flex-row md:items-center justify-between gap-2 px-4">
//           <div className="flex shrink-0 items-center gap-2">
//             <SidebarTrigger size={"icon-lg"} className="-ml-1" />
//           </div>

//           <div className="flex gap-2">
//             <InputGroup className="w-fit">
//               <InputGroupAddon>
//                 <InputGroupText>https://</InputGroupText>
//               </InputGroupAddon>
//               <InputGroupInput placeholder="example.com" className="!pl-0.5" value={"linktr.ee/sandip"} />
//               <InputGroupAddon align="inline-end">
//                 <InputGroupText>.com</InputGroupText>
//               </InputGroupAddon>
//             </InputGroup>

//             <Select value={theme} onValueChange={setTheme}>
//               <SelectTrigger className="w-fit">
//                 <SelectValue placeholder="Select a theme" />
//               </SelectTrigger>

//               <SelectContent>
//                 {Object.keys(mobileThemes).map(key => (
//                   <SelectItem key={key} value={key}>
//                     <span className="capitalize">{key}</span>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <ThemeSwitch />
//           </div>
//         </header>

//         {/* CONTENT */}
//         <div className="flex flex-1 flex-col p-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* LEFT PANEL */}
//             <LinksPanel links={links} setLinks={setLinks} />

//             {/* MOBILE PREVIEW */}
//             <MobilePreview theme={theme} links={links} />
//           </div>

//         </div>

//       </SidebarInset>
//     </SidebarProvider>
//   );
// }
