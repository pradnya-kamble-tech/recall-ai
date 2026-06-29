import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function DashboardPage() {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
        >
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Memory Space
            </h1>
            <p className="text-muted-foreground max-w-lg">
                This is the beginning of your organizational memory.
            </p>
        </motion.div>
    );
}
