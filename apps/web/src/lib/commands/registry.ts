import { type CommandPlugin, type CommandGroup } from "./types";

/**
 * A simple registry to manage the registered command plugins.
 * In a real, scalable architecture, this allows completely decoupled feature modules
 * to inject their commands into the global palette without modifying the palette directly.
 */
class CommandRegistry {
    private plugins: CommandPlugin[] = [];

    register(plugin: CommandPlugin) {
        this.plugins.push(plugin);
    }

    /**
     * Executes all plugins to gather the current state of commands.
     * Can pass global context here if needed in the future.
     */
    getCommands(): CommandGroup[] {
        return this.plugins.flatMap((plugin) => plugin());
    }
}

export const commandRegistry = new CommandRegistry();
