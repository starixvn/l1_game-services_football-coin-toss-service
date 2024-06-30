import moment, { Moment, MomentInput } from "moment";
import { Match } from "../models/rounds";
import mongoose from "mongoose";

export default class MatchHelper {
    matchRepository: mongoose.Model<Match>;

    constructor(matchRepository: mongoose.Model<Match>) {
        this.matchRepository = matchRepository;
    }
}

export const calculateEndTime = (startTime: Moment) => {
    return startTime.clone().add(120, "minutes");
};

export const getMatchStatus = (startTime: Moment, current: Moment) => {
    const matchEndTime = calculateEndTime(startTime);

    if (current.isBetween(startTime, matchEndTime, undefined, "[]")) {
        return "inProgress";
    }

    if (startTime.isAfter(current)) {
        return "future";
    }

    return "past";
};

export const getNextMatch = (matches: Array<Match>) => {
    const defaultMatch = { home: "", away: "" };
    if (matches.length === 0) {
        return defaultMatch;
    }

    const now = moment();

    const matchesWithStatus = matches.map((match) => ({
        ...match,
        status: getMatchStatus(moment(match.startTime as MomentInput), now),
    }));

    const inProgressMatch = matchesWithStatus.find((match) => match.status === "inProgress");

    if (inProgressMatch) {
        return inProgressMatch;
    }

    const futureMatch = matchesWithStatus.find((match) => match.status === "future");

    if (futureMatch) {
        return futureMatch;
    }

    return matchesWithStatus.findLast((match) => match.status === "past") ?? defaultMatch;
};
