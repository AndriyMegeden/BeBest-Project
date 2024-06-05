package bebest.petrishin.com;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.community.facebooklogin.FacebookLogin;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        this.registerPlugin(GoogleAuth.class);
//        this.registerPlugin(FacebookLogin.class);

        super.onCreate(savedInstanceState);
    }
}
