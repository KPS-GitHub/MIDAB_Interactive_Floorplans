import { ConfigurationState } from "./ConfigurationState";
import { ApplyChoice } from "./ApplyChoice";
import { OptChoice } from "./Choices/OptChoice";
/**
 * Option configurator session which manages the initial state,
 * current state and list of actions performed during the session.
 * This class is intended to be singleton.
 */
export declare class OptConfiguratorSession {
    readonly initialOptState: ConfigurationState;
    /**
     * Initializes session
     * @param initialOptState Configuration state at the start of session.
     * */
    constructor(initialOptState: ConfigurationState);
    get actionIndex(): number;
    /** List of choices made during the session */
    get selections(): Required<ApplyChoice>[];
    getCopy(): OptConfiguratorSession;
    /**
     * Latest configuration state. Updated after rule evaluation.
     * */
    currentState: ConfigurationState;
    /** @deprecated */
    actionList: Required<ApplyChoice>[];
    getSaveLink(includeImages?: boolean): string;
    /** Applies a choice, causing rules to be evaluated. */
    applyChoice(choice: OptChoice): ConfigurationState;
    /** Applies a choice, causing rules to be evaluated. */
    applyAction(action: ApplyChoice): ConfigurationState;
}
