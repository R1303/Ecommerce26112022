package com.rajan.ecommerce9.jwt.resources;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rajan.ecommerce9.database.config.UserJpaRespository;
import com.rajan.ecommerce9.entity.User;
import com.rajan.ecommerce9.jwt.JwtInMemoryUserDetailsService;
import com.rajan.ecommerce9.jwt.JwtTokenUtil;
import com.rajan.ecommerce9.jwt.JwtUserDetails;
import com.rajan.ecommerce9.rest.configuration.DeviceRestController;

@RestController
@CrossOrigin
public class JwtAuthenticationRestController {

	@Value("${jwt.http.request.header}")
	private String tokenHeader;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsService jwtInMemoryUserDetailsService;

	@Autowired
	private UserJpaRespository jpaRespository;
	

	@Autowired
	private JwtInMemoryUserDetailsService jwtService;
	User selectedUser;
	long newUserId;
	List<User> users;

	@SuppressWarnings("static-access")
	@RequestMapping(value = "${jwt.get.token.uri}", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest) throws AuthenticationException {
		System.out.println("Authentication ............" + authenticationRequest.isRegister());
		System.out.println("Authentication ............" + authenticationRequest.getEmail());
		System.out.println("Authentication ............" + authenticationRequest.getPhone());
		System.out.println("Authentication ............" + authenticationRequest.getPassword());
        selectedUser=null;
		users=jpaRespository.findAll();
		if (authenticationRequest.isRegister().equalsIgnoreCase("true")) {	
			Optional<User>optionalUser=users.parallelStream().filter(x->x.getUserEmail().equals(authenticationRequest.getEmail())).findAny();
			if(optionalUser.isPresent())
				return ResponseEntity.ok(new JwtTokenResponse("User Already Present"));
			
			User user = users.get(users.size() - 1);
			long id = user.getId();
			id++;
			newUserId=id;
			BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
			String encodedPassword = bCryptPasswordEncoder.encode(authenticationRequest.getPassword());
			jwtService.inMemoryUserList.add(new JwtUserDetails(id, authenticationRequest.getEmail(), encodedPassword, "ROLE_USER_2"));
			jwtService.userList=null;
            DeviceRestController deviceRestController=new DeviceRestController();
			User user2=new User(id,authenticationRequest.getEmail(),authenticationRequest.getEmail(),authenticationRequest.getPhone(),authenticationRequest.getPassword());
			deviceRestController.addUserInternally(user2);
			jpaRespository.save(user2);
		}
		Optional<User>user=users.parallelStream().filter(x->x.getUserEmail().equals(authenticationRequest.getEmail())).findAny();
		if(user.isPresent())
			selectedUser=user.get();
		authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());
		final UserDetails userDetails = jwtInMemoryUserDetailsService.loadUserByUsername(authenticationRequest.getEmail());
		final String token = jwtTokenUtil.generateToken(userDetails);
		System.out.println("Authentication Successs............" + authenticationRequest.getUsername());
		if (selectedUser != null) {
			return ResponseEntity.ok(new JwtTokenResponse(token + "%id%" + selectedUser.getId()));
		} else if (authenticationRequest.isRegister().equalsIgnoreCase("true")) {
			return ResponseEntity.ok(new JwtTokenResponse(token + "%id%" + newUserId));
		} else {
			return ResponseEntity.ok(new JwtTokenResponse("User Already Present"));
		}
	}

	@RequestMapping(value = "${jwt.refresh.token.uri}", method = RequestMethod.GET)
	public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
		String authToken = request.getHeader(tokenHeader);
		final String token = authToken.substring(7);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		@SuppressWarnings("unused")
		JwtUserDetails user = (JwtUserDetails) jwtInMemoryUserDetailsService.loadUserByUsername(username);

		if (jwtTokenUtil.canTokenBeRefreshed(token)) {
			String refreshedToken = jwtTokenUtil.refreshToken(token);
			return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
		} else {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@ExceptionHandler({ AuthenticationException.class })
	public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	}

	private void authenticate(String username, String password) {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new AuthenticationException("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new AuthenticationException("INVALID_CREDENTIALS", e);
		}
	}
}