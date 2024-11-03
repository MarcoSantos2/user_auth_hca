```mermaid
flowchart TD

    subgraph Backend Layer
        DB["MySQL"]
        API["REST API (App)"]
        API_TS["TypeScript"]
        API_EXPRESS["Express"]
        API_TYPEORM["TypeORM"]
        API <--> API_TS
        API_TS <--> API_EXPRESS
        API_EXPRESS <--> API_TYPEORM
        API_TYPEORM <--> DB
    end

    subgraph Web Application
        WEB["React JS"]
        WEB_STYLES["CSS/HTML"]
        WEB <--> WEB_STYLES
    end

    subgraph Mobile Application
        MOBILE["React Native"]
        MOBILE <--> Android["Android Native Elements"]
        MOBILE <--> iOS["iOS Native Elements"]
    end

    API <----> WEB
    API <---> MOBILE