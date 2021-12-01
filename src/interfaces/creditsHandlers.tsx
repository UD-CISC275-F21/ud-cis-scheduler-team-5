export interface creditsHandlers {
    globalCredits: number;
    setGlobalCredits: (c: number)=>void;
    techElectiveCredits: number;
    setTechElectiveCredits: (t: number)=>void;
    focusAreaCredits: number;
    setFocusAreaCredits: (f: number)=>void;
}