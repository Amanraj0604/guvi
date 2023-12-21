const router = require("express").Router();
const User = require("../model/auth");
// const updateUser = require("../model/update");
const bcrypt = require('bcrypt');

router.post("/register", async (req, res) => {
    // console.log(req.body);
    try {
        
        if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(req.body.email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }


        const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
        if (!passwordRegex.test(req.body.password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one special character' });
        }

        const salt1 = await bcrypt.genSalt(10);
        const pass1 = await bcrypt.hash(req.body.password, salt1);

        const salt2 = await bcrypt.genSalt(10);
        const pass2 = await bcrypt.hash(req.body.cnfpassword, salt2);

        if (req.body.password === req.body.cnfpassword) {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: pass1,
                cnfpassword: pass2,
            });

            const user = await newUser.save();
            res.status(201).json({ message: "User registered successfully", user });
        } else {
            return res.status(400).send('Both passwords do not match');
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    // console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Incorrect password" });
        }
        
        const { password, ...userInfo } = user._doc;
        
        res.status(201).json({ message: "User login successfully", userInfo });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                phone: req.body.phone,
                dob: req.body.dob,
                gender: req.body.gender,
                city: req.body.city,
            }
        }, { new: true });
        const modifyedUser = await updateUser.save();
        if (!updateUser) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json({ message: "User details updated successfully", updateUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





module.exports = router;
