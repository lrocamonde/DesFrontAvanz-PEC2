import { UserEffects } from "../user/effects/user.effects";
import { AuthEffects } from "../auth/effects/auth.effects";
import { CategoryEffects } from "../category/effects/category.effects";
import { PostEffects } from "../post/effects/post.effects";

export const EffectsArray: any[] = [UserEffects, AuthEffects, CategoryEffects, PostEffects];