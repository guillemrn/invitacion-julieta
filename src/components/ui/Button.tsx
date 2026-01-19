import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'orange';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', children, ...props }) => {

    // Base styles
    const baseStyles = "inline-flex items-center justify-center font-black rounded-4xl transition-all select-none cursor-pointer active:scale-95";

    // Variants with Puffy 3D effect (border-b-6px)
    const variants = {
        primary: "bg-[#72bfed] text-white border-b-[6px] border-[#30598a] hover:brightness-105 active:border-b-[2px] active:translate-y-[4px]",
        orange: "bg-[#f1b873] text-[#5d4037] border-b-[6px] border-[#e27a37] hover:brightness-105 active:border-b-[2px] active:translate-y-[4px]",
        secondary: "bg-[#e4dcbd] text-[#5d4037] border-b-[6px] border-[#cbbea6] hover:brightness-105 active:border-b-[2px] active:translate-y-[4px]",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
